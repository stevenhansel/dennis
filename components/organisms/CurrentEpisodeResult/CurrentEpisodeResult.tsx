import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { ResultCard } from '../../molecules';
import InformationHeader from '../InformationHeader';

import { CurrentEpisode, EpisodeVote, Song } from '../../../types/model';

type Props = {
  currentEpisode: CurrentEpisode
  sortedVotes: EpisodeVote[]
  songMap: Record<string, Song>
  numOfSubscribers: number
  selectedEpisodeSongId: number
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
    numOfSubscribers,
    selectedEpisodeSongId,
  } = props

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      className='flex flex-col h-full p-2 md:max-w-256 md:p-4'
    >
      <InformationHeader
        episode={currentEpisode}
        numOfSubscribers={numOfSubscribers}
        withCountdown
      />
      <div>
        <AnimateSharedLayout>
          <AnimatePresence>
            {sortedVotes.filter((vote) => !songMap[vote.episodeSongId]?.releasedAtEpisodeId).map((vote) => {
              const percentage = (vote.numOfVotes / currentEpisode.numOfVotesCasted) * 100;

              return (
                <ResultCard
                  key={vote.episodeSongId}
                  rank={vote.rank}
                  songNameJp={songMap[vote.episodeSongId]?.songNameJp}
                  songNameEn={songMap[vote.episodeSongId]?.songNameEn}
                  artistNameJp={songMap[vote.episodeSongId]?.artistNameJp}
                  artistNameEn={songMap[vote.episodeSongId]?.artistNameEn}
                  votes={vote.numOfVotes}
                  votePercentage={percentage}
                  isVoted={selectedEpisodeSongId === vote.episodeSongId}
                  className="mb-4"
                />
              )
            })}
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
    </motion.div>
  )
}

export default CurrentEpisodeResult