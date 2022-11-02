import type { NextPage } from "next";
import Head from "next/head";

import { useMemo, useEffect } from "react";
import { useQueryClient } from "react-query";
import useWebSocket from 'react-use-websocket';
import { AnimatePresence } from 'framer-motion';

import { fetchCurrentEpisode, useCurrentEpisodeQuery } from "../hooks/useCurrentEpisodeQuery";
import { fetchHasVoted, useHasVotedQuery } from "../hooks/useHasVotedQuery";
import { fetchEpisodeVotes, useEpisodeVotesQuery } from "../hooks/useEpisodeVotesQuery";

import { CurrentEpisode, EpisodeVote, HasVoted, Song } from "../types/model";
import { CurrentEpisodeResult, CurrentEpisodeVote } from '../components/organisms';

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

  const { lastMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_BASE_WS_URL}/${props.currentEpisode.id}`);

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
        <AnimatePresence>
          {currentEpisode && hasVoted && hasVoted.hasVoted && (
            <CurrentEpisodeResult
              currentEpisode={currentEpisode}
              sortedVotes={sortedVotes}
              songMap={songMap}
            />
          )}
          {currentEpisode && hasVoted && !hasVoted.hasVoted && (
            <CurrentEpisodeVote
              currentEpisode={currentEpisode}
              hasVoted={hasVoted}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
