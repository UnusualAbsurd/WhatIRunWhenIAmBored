import { useState } from "react";
import { NextSeo } from "next-seo";
import GameRoom from "../components/GameRoom";

export default function Home() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <NextSeo
        title="Ungame"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/players/player-stand.png",
          },
        ]}
      />
      {!playing ? (
        <div
          className="flex justify-center items-center mt-[20rem]
      "
        >
          <button
            className="rounded-md px-10 py-5 bg-gray-700 hover:bg-gray-800 text-white text-lg font-semibold  border-gray-500 border-2 border-double"
            onClick={() => setPlaying(true)}
          >
            Start Game
          </button>
        </div>
      ) : (
        <GameRoom />
      )}
    </>
  );
}
