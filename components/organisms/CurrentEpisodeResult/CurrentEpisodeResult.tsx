import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { Countdown, ResultCard } from '../../molecules';

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
      <div className="pt-2 pb-3 px-1 md:px-2 text-bold w-full bg-gray-800 md:pt-8 md:pb-4">
        <div className="text-white font-bold text-xl md:text-3xl">
          Episode {currentEpisode.episode}
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-between pt-2 md:pt-4">
          <div className="mb-1 md:mb-0">
            <div className="flex items-center">
              <div className="rounded-full bg-green-500 w-2 h-2 mr-2 mt-1" />
              <div>
                <span className="text-white text-sm md:text-base">{numOfSubscribers} devil hunter{numOfSubscribers > 1 ? 's' : ''} {numOfSubscribers > 1 ? 'are' : 'is'} lurking</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-1 md:mb-0">
            <p className="text-white text-xs md:text-base mb-0.5 md:mb-1">{new Date(currentEpisode.episodeDate).toLocaleString()}</p>
            <Countdown className="mb-0.5 md:mb-1 text-xs" date={new Date(currentEpisode.episodeDate)} />
          </div>
        </div>

        <p className="text-white text-center text-xs md:text-base mt-4 md:mt-6">{currentEpisode.numOfVotesCasted} votes has been casted</p>
      </div>

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