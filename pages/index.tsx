import type { NextPage } from "next";
import Head from "next/head";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { OptionSongCard, ResultCard, SongDetail } from "../components";
import { fetchCurrentEpisode, useCurrentEpisodeQuery } from "../hooks/useCurrentEpisodeQuery";
import { fetchHasVoted, useHasVotedQuery } from "../hooks/useHasVotedQuery";
import { fetchEpisodeVotes, useEpisodeVotesQuery } from "../hooks/useEpisodeVotesQuery";
import { useVoteMutation } from "../hooks/useVoteMutation";

import { CurrentEpisode, EpisodeVote, HasVoted, Song } from "../types/model";
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

export const getServerSideProps = async () => {
  const currentEpisode = await fetchCurrentEpisode();
  const hasVoted = await fetchHasVoted(currentEpisode.id);

  let episodeVotes: EpisodeVote[] = [];
  if (hasVoted.hasVoted) {
    episodeVotes = await fetchEpisodeVotes(currentEpisode.id);
  }

  return {
    props: {
      currentEpisode,
      hasVoted,
      episodeVotes,
    }
  }
}

type Props = {
  currentEpisode: CurrentEpisode;
  hasVoted: HasVoted;
  episodeVotes: EpisodeVote[];
};

const Home: NextPage<Props> = (props) => {
  const queryClient = useQueryClient();

  const { data: currentEpisode } = useCurrentEpisodeQuery({ initialData: props.currentEpisode })
  const { data: hasVoted } = useHasVotedQuery({ initialData: props.hasVoted, episodeId: props.currentEpisode.id })
  const { data: episodeVotes } = useEpisodeVotesQuery({ initialData: props.episodeVotes, episodeId: props.currentEpisode.id });

  const { lastMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_BASE_WS_URL}/${props.currentEpisode.id}`);

  const voteMutation = useVoteMutation(queryClient);

  const [selectedSong, setSelectedSong] = useState<Song>(props.currentEpisode.songs[0])

  const votedSong = useMemo(() => {
    if (hasVoted === undefined || currentEpisode === undefined) return null;
    if (hasVoted.hasVoted === false) return null

    return currentEpisode.songs.find((s) => s.episodeSongId === hasVoted.episodeSongId);
  }, [currentEpisode, hasVoted]);

  const songMap: Record<string, Song> = useMemo(() => {
    let map: Record<string, Song> = {}
    if (currentEpisode?.songs) {
      map = currentEpisode.songs.reduce<Record<string, Song>>((acc, cur) => ({
        ...acc,
        [cur.episodeSongId]: cur,
      }), map)
    }
    return map
  }, [currentEpisode]);

  const sortedVotes = useMemo(() => {
    if (episodeVotes) {
      return episodeVotes.sort((a, b) => a.rank - b.rank)
    }
    return []
  }, [episodeVotes])

  const handleVote = useCallback(() => {
    voteMutation.mutate({
      episodeSongId: selectedSong.episodeSongId,
    });
  }, [voteMutation, selectedSong]);

  useEffect(() => {
    if (lastMessage === null) return;
    const data = JSON.parse(lastMessage.data);
    if (data.message) {
      queryClient.setQueryData('episodeVotes', data.message);
    }
  }, [queryClient, lastMessage])

  return (
    <div>
      <Head>
        <title>CSM Ending Song Predictions</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 h-max-screen min-h-screen">
        {currentEpisode && hasVoted && hasVoted?.hasVoted && (
          <>
            <div className="sticky p-4 text-bold w-full bg-gray-800 text-center top-0 z-10 md:p-8">
              <div className="text-white font-bold md:text-3xl">
                Episode {currentEpisode.episode} Vote Result
              </div>
            </div>
            <div className="p-2 md:p-16">
            <AnimateSharedLayout>
              <AnimatePresence>
                {sortedVotes.map((vote) => (
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
          </>
        )}
        {currentEpisode && hasVoted && hasVoted.hasVoted && (
          <>
            <div className="sticky p-4 text-bold w-full bg-gray-800 text-center top-0 z-10 md:p-8">
              <div className="text-white font-bold md:text-3xl">
                Vote ED Theme Song for Episode {currentEpisode.episode}
              </div>
            </div>
            <div className="relative text-white flex flex-col p-2 md:flex-row md:p-16">
              <div className="grid grid-cols-2 order-last gap-4 pb-12 md:order-none md:grid-cols-1 md:pb-0 md:mr-40">
                {currentEpisode.songs.map((song) => (
                  <OptionSongCard
                    key={song.id}
                    className=""
                    artistNameJp={song.artistNameJp}
                    selected={song.id === selectedSong.id}
                    onSelect={() => setSelectedSong(song)}
                  />
                ))}
              </div>
              <div className="mb-4 md:mb-0 md:mt-4">
                <SongDetail
                  songNameEn={selectedSong.songNameEn}
                  songNameJp={selectedSong.songNameJp}
                  artistNameEn={selectedSong.artistNameEn}
                  artistNameJp={selectedSong.artistNameJp}
                  imageSrc={selectedSong.coverImageUrl}
                  onClick={() => {}}
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
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
