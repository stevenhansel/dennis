import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { SongCard } from "../components";

const endingSongs = [
  {
    rank: 1,
    songJpName: "残機",
    songEnName: "Zanki",
    artistJpName: "ずっと真夜中でいいのに",
    artistEnName: "ZUTOMAYO",
    imageSrc: "1.jpeg",
    actualEpisodeNumber: 2,
    numberOfVotes: 1024,
  },
  {
    rank: 2,
    songJpName: "CHAINSAW BLOOD",
    songEnName: "",
    artistJpName: "バウンディ",
    artistEnName: "Vaundy",
    imageSrc: "2.jpeg",
    actualEpisodeNumber: 1,
    numberOfVotes: 512,
  },
  {
    rank: 3,
    songJpName: "刃渡り2億センチ",
    songEnName: "Hawatari 2-Oku Centi",
    artistJpName: "マキシマム ザ ホルモン",
    artistEnName: "Maximum The Hormone",
    imageSrc: "3.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 4,
    songJpName: "ちゅ、多様性",
    songEnName: "Chu, Tayousei",
    artistJpName: "あの",
    artistEnName: "ano",
    imageSrc: "4.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 5,
    songJpName: "Deep down",
    songEnName: "",
    artistJpName: "エメ",
    artistEnName: "Aimer",
    imageSrc: "5.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 6,
    songJpName: "大脳的なランデブー",
    songEnName: "Dainоteki na Rendezvous",
    artistJpName: "Kanaria",
    artistEnName: "カナリア",
    imageSrc: "6.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 7,
    songJpName: "インザバックルーム",
    songEnName: "In the Back Room",
    artistJpName: "手動",
    artistEnName: "syudou",
    imageSrc: "7.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 8,
    songJpName: "ファイトソング",
    songEnName: "Fight Song",
    artistJpName: "いぶ",
    artistEnName: "Eve",
    imageSrc: "8.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 9,
    songJpName: "バイオレンス",
    songEnName: "Violence",
    artistJpName: "女王蜂",
    artistEnName: "Queen Bee",
    imageSrc: "9.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 10,
    songJpName: "first death",
    songEnName: "",
    artistJpName: "TK from 凛として時雨",
    artistEnName: "TK from ling tosite sigure",
    imageSrc: "10.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 11,
    songJpName: "錠剤",
    songEnName: "Jоzai",
    artistJpName: "TOOBOE スタッフ",
    artistEnName: "",
    imageSrc: "11.jpeg",
    numberOfVotes: 0,
  },
  {
    rank: 12,
    songJpName: "DOGLAND",
    songEnName: "",
    artistJpName: "PEOPLE 1",
    artistEnName: "ピープルワン",
    imageSrc: "12.jpeg",
    numberOfVotes: 0,
  },
];

const Home: NextPage = () => {
  const [isVoted, setIsVoted] = useState(false);

  return (
    <div>
      <Head>
        <title>CSM Ending Song Predictions</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black h-max-screen text-white flex flex-col items-center pt-8">
        <h1 className="text-4xl mb-8">
          Vote for Episode <span>3</span>
        </h1>

        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          {endingSongs.map((song, index) => (
            <SongCard
              key={index}
              className="mb-4"
              rank={song.rank}
              songJpName={song.songJpName}
              songEnName={song.songEnName}
              artistJpName={song.artistJpName}
              artistEnName={song.artistEnName}
              imageSrc={song.imageSrc}
              actualEpisodeNumber={song.actualEpisodeNumber}
              numberOfVotes={song.numberOfVotes}
              isVoted={isVoted}
              onVote={() => setIsVoted(true)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
