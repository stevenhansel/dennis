import { useState } from 'react';
import { motion, usePresence } from 'framer-motion';
import clsx from "clsx";

type Props = {
  rank: number;
  artistNameJp: string;
  artistNameEn: string;
  songNameJp: string;
  songNameEn: string;
  votes: number;
  className?: string;
};

const ResultCard = (props: Props) => {
  const {
    rank,
    artistNameEn,
    artistNameJp,
    songNameEn,
    songNameJp,
    className = "",
    votes = 0,
  } = props;

  const [isEn, setIsEn] = useState(false);
  const [isPresent, safeToRemove] = usePresence();

  const songName = isEn && songNameEn ? songNameEn : songNameJp;
  const artistName = isEn && artistNameEn ? artistNameEn : artistNameJp;

  return (
    <motion.button
      layout
      initial="out"
      animate={isPresent ? "in" : "out"}
      variants={{
        in: { scale: 1, opacity: 1 },
        out: { scale: 0, opacity: 0, zIndex: -1 }
      }}
      onAnimationComplete={() => !isPresent && safeToRemove()}
      transition={{ type: "spring", stiffness: 500, damping: 60, mass: 1 }}
      onClick={() => setIsEn(!isEn)}
      className={clsx("rounded-xl flex w-full justify-between items-center p-2 bg-gray-700 shadow-md md:px-8", isPresent ? "static" : "absolute", className)}
    >
      <div className="flex items-center">
        <div className="font-bold mr-2 text-white md:text-xl md:mr-8">
          {rank}
        </div>
        <div className="text-left text-white">
          <h2 className="text-sm md:text-xl">
            {songName} 
          </h2>
          <h2 className="text-sm md:text-xl">
            {artistName} 
          </h2>
        </div>
      </div>
      <div>
        <h2 className="text-sm text-white md:text-xl">
          {votes} {votes > 1 ? 'Votes' : 'Vote'}
        </h2>
      </div>
    </motion.button>
  );
};

export default ResultCard;
