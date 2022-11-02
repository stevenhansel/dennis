import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';

import { OptionSongCard, SongDetail } from '../../molecules';

import { CurrentEpisode, HasVoted, Song } from '../../../types/model';
import { useCallback, useMemo, useState } from 'react';
import { useVoteMutation } from '../../../hooks/useVoteMutation';

type Props = {
  currentEpisode: CurrentEpisode
  hasVoted: HasVoted
}

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const CurrentEpisodeVote = (props: Props) => {
  const {
    currentEpisode,
    hasVoted,
  } = props

  const queryClient = useQueryClient();

  const voteMutation = useVoteMutation(queryClient);

  const [selectedSong, setSelectedSong] = useState<Song>(props.currentEpisode.songs[0])

  const votedSong = useMemo(() => {
    if (hasVoted === undefined || currentEpisode === undefined) return null;
    if (hasVoted.hasVoted === false) return null

    return currentEpisode.songs.find((s) => s.episodeSongId === hasVoted.episodeSongId);
  }, [currentEpisode, hasVoted]);

  const handleVote = useCallback(() => {
    voteMutation.mutate({
      episodeSongId: selectedSong.episodeSongId,
    });
  }, [voteMutation, selectedSong]);

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      className='flex flex-col w-full h-full'
    >
      <div className="sticky p-4 text-bold w-full bg-gray-800 text-center top-0 z-10 md:p-8">
        <div className="text-white font-bold md:text-3xl">
          Vote ED Theme Song for Episode {currentEpisode.episode}
        </div>
      </div>
      <div className="relative text-white w-full flex flex-col p-2 md:flex-row md:p-16">
        <div className="grid grid-cols-2 order-last gap-4 pb-12 md:order-none md:grid-cols-1 md:pb-0 md:mr-40">
          {currentEpisode.songs.filter((song) => !song.releasedAtEpisodeId).map((song) => (
            <OptionSongCard
              key={song.id}
              className=""
              artistNameJp={song.artistNameJp}
              selected={song.id === selectedSong.id}
              onSelect={() => setSelectedSong(song)}
            />
          ))}
        </div>
        <div className="flex flex-col w-full mb-4 md:mb-0 md:mt-4">
          <SongDetail
            songNameEn={selectedSong.songNameEn}
            songNameJp={selectedSong.songNameJp}
            artistNameEn={selectedSong.artistNameEn}
            artistNameJp={selectedSong.artistNameJp}
            imageSrc={selectedSong.coverImageUrl}
          />
          <div className="flex items-center justify-center mt-4 flex-col">
            {votedSong ? (
              <div className="ml-2 mb-4">
                You voted on {votedSong.songNameJp} by {votedSong.artistNameEn}
              </div>
            ) : null}

            <button
              className="rounded-xl bg-slate-200 w-fit text-black py-2 px-4 mb-1"
              onClick={handleVote}
            >
              Vote
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CurrentEpisodeVote