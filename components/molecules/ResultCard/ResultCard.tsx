import { useState } from 'react';
import { motion, usePresence } from 'framer-motion';
import clsx from "clsx";
import { ProgressBar } from '../../atoms';

type Props = {
  rank: number;
  artistNameJp: string;
  artistNameEn: string;
  songNameJp: string;
  songNameEn: string;
  votes: number;
  votePercentage: number;
  isVoted: boolean;
  className?: string;
};

const ResultCard = (props: Props) => {
  const {
    rank,
    artistNameEn,
    artistNameJp,
    songNameEn,
    songNameJp,
    isVoted,
    className = "",
    votes = 0,
    votePercentage = 0,
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
      className={clsx("rounded-xl w-full h-[80px] md:h-[110px] py-2 md:py-3 px-4 bg-gray-700 shadow-md md:px-8", isPresent ? "static" : "absolute", className, {
        "border-2 border-orange-400": isVoted,
      })}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center">
          <div className="font-bold mr-4 text-white md:text-xl md:mr-8">
            {rank}
          </div>


          <div className="text-left text-white w-full">
            <h2 className="text-sm md:text-xl">
              {songName}
            </h2>
            <h2 className={"text-xs md:text-base"}>
              {artistName}
            </h2>

            {votePercentage > 0 ? (
              <ProgressBar className="mt-3" progress={votePercentage} />
            ) : null}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-white md:text-xl mb-1">
            {votePercentage.toFixed(1)}%
          </h2>

          <p className="text-xs text-white md:text-sm">
            {votes} {votes > 1 ? 'votes' : 'vote'}
          </p>
        </div>
      </div>
      <div>
      </div>
    </motion.button>
  );
};

export default ResultCard;
