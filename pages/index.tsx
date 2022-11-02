import Head from "next/head";
import dynamic from "next/dynamic";

import { useMemo, useEffect } from "react";
import { useQueryClient } from "react-query";
import useWebSocket from 'react-use-websocket';
import { AnimatePresence } from 'framer-motion';

import { fetchCurrentEpisode, useCurrentEpisodeQuery } from "../hooks/useCurrentEpisodeQuery";
import { fetchHasVoted, useHasVotedQuery } from "../hooks/useHasVotedQuery";
import { fetchEpisodeVotes, useEpisodeVotesQuery } from "../hooks/useEpisodeVotesQuery";

import { CurrentEpisodeResult, CurrentEpisodeVote, Layout } from '../components/organisms';

import { CurrentEpisode, EpisodeVote, HasVoted, Song } from "../types/model";
import { NextPageWithLayout } from '../types/component';

const Countdown = dynamic(() => import('../components/molecules/Countdown'), { ssr: false });

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

const Home: NextPageWithLayout<Props> = (props) => {
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
    <>
      <Head>
        <title>CSM Ending Song Predictions</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        <Countdown date={new Date(props.currentEpisode.episodeDate)} />
        {currentEpisode && hasVoted && hasVoted.hasVoted && (
          <CurrentEpisodeResult
            key="result"
            currentEpisode={currentEpisode}
            sortedVotes={sortedVotes}
            songMap={songMap}
          />
        )}
        {currentEpisode && hasVoted && !hasVoted.hasVoted && (
          <CurrentEpisodeVote
            key="vote"
            currentEpisode={currentEpisode}
            hasVoted={hasVoted}
          />
        )}
      </AnimatePresence>
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home;
