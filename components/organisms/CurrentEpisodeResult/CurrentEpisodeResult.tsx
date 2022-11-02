import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { ResultCard } from '../../molecules';

import { CurrentEpisode, EpisodeVote, Song } from '../../../types/model';

type Props = {
  currentEpisode: CurrentEpisode
  sortedVotes: EpisodeVote[]
  songMap: Record<string, Song>
}

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const CurrentEpisodeResult = (props: Props) => {
  const {
    currentEpisode,
    sortedVotes,
    songMap,
  } = props

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      className='flex flex-col w-full h-full'
    >
      <div className="p-4 text-bold w-full bg-gray-800 text-center md:p-8">
        <div className="text-white font-bold md:text-3xl">
          Episode {currentEpisode.episode} Vote Result
        </div>
      </div>
      <div className="p-2 md:p-16">
      <AnimateSharedLayout>
        <AnimatePresence>
          {sortedVotes.filter((vote) => !songMap[vote.episodeSongId].releasedAtEpisodeId).map((vote) => (
            <ResultCard
              key={vote.episodeSongId}
              rank={vote.rank}
              songNameJp={songMap[vote.episodeSongId].songNameJp}
              songNameEn={songMap[vote.episodeSongId].songNameEn}
              artistNameJp={songMap[vote.episodeSongId].artistNameJp}
              artistNameEn={songMap[vote.episodeSongId].artistNameEn}
              votes={vote.numOfVotes}
              className="mb-4"
            />
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
      </div>
    </motion.div>
  )
}

export default CurrentEpisodeResult