/* eslint-disable react/jsx-key */
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";

type PlayerStyles =
  | "runright"
  | "runleft"
  | "punchright"
  | "punchleft"
  | "stand"
  | "jump";

export default function GameRoom() {
  const [playerStyle, setPlayerStyle] = useState<PlayerStyles>("stand");
  const [playerPosition, setPlayerPosition] = useState({ x: 860, y: 338 });
  const [playPunch] = useSound("/audios/punch.mp3", {
    volume: 0.2,
  });

  const handleContext = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleLeftClick = (e: MouseEvent) => {
    playPunch();
    if (e.button == 0) setPlayerStyle("punchleft");
    else if (e.button == 2) setPlayerStyle("punchright");
    setTimeout(() => setPlayerStyle("stand"), 500);
  };

  const handleRun = (e: KeyboardEvent) => {
    setPlayerStyle("stand");
  };

  const handleWASD = (e: KeyboardEvent) => {
    if (e.key == "a") {
      setPlayerStyle("runleft");
      setPlayerPosition({ x: playerPosition.x - 20, y: playerPosition.y });
    } else if (e.key == "d") {
      setPlayerStyle("runright");
      setPlayerPosition({ x: playerPosition.x + 20, y: playerPosition.y });
    } else if (e.key == "s") {
      setPlayerStyle("jump");
      setPlayerPosition({ x: playerPosition.x, y: playerPosition.y + 60 });
    } else if (e.key == "w") {
      setPlayerStyle("jump");
      setPlayerPosition({ x: playerPosition.x, y: playerPosition.y - 60 });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleLeftClick);
    document.addEventListener("contextmenu", handleContext);
    document.addEventListener("keydown", handleWASD);
    document.addEventListener("keyup", handleRun);

    return () => {
      document.removeEventListener("mousedown", handleLeftClick);
      document.removeEventListener("contextmenu", handleContext);
      document.removeEventListener("keydown", handleWASD);
      document.removeEventListener("keyup", handleRun);
    };
  });

  return (
    <>
      <div className="flex justify-center items-center mt-[20rem]">
        <div
          onClick={(e) => console.log(e.pageX.toString() + ` ${e.pageY}`)}
          style={{
            left: playerPosition.x,
            top: playerPosition.y,
            position: "absolute",
          }}
          className="selection:cursor-default"
        >
          <Image
            src={`/players/player-${playerStyle}.png`}
            alt="Player"
            width={64}
            height={64}
          />
        </div>
      </div>
    </>
  );
}
