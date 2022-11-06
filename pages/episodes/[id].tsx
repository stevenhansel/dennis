import { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

import { VotePieChart, YoutubeEmbed, SpotifyEmbed, ResultCard } from '../../components/molecules';
import { InformationHeader, Layout } from '../../components/organisms';

import type { NextPageWithLayout } from "../../types/component";
import { CurrentEpisode, EpisodeVote, HasVoted, Maybe, Song } from '../../types/model';

import {
  fetchEpisodeById,
  useEpisodeByIdQuery,
} from "../../hooks/useEpisodeByIdQuery";
import { fetchHasVoted, useHasVotedQuery } from "../../hooks/useHasVotedQuery";
import {
  fetchEpisodeVotes,
  useEpisodeVotesQuery,
} from "../../hooks/useEpisodeVotesQuery";

import { fetchNumOfSubscribers } from "../../hooks/useNumOfSubscribersQuery";
import { newSubscriberTopic } from '../../constants/topics';
import { useQueryClient } from 'react-query';
import { ReadyState } from 'react-use-websocket';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

export const getServerSideProps = async (context: NextPageContext) => {
  const id = parseInt(context.query.id as string, 10);
  const episode = await fetchEpisodeById(id);
  const hasVoted = await fetchHasVoted(id);
  const episodeVotes = await fetchEpisodeVotes(id);

  return {
    props: {
      episodeVotes,
      episode,
      hasVoted,
    },
  };
};

type Props = {
  episode: CurrentEpisode;
  episodeVotes: EpisodeVote[];
  hasVoted: HasVoted;
};

const EpisodeDetail: NextPageWithLayout<Props> = (props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const id = parseInt(router.query.id as string, 10)

  const [numOfSubscribers, setNumOfSubscribers] = useState(0);

  const { lastMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_BASE_WS_URL}/${id}`
  );

  const { data: episode } = useEpisodeByIdQuery({
    initialData: props.episode,
    episodeId: id,
  });
  const { data: hasVoted } = useHasVotedQuery({
    initialData: props.hasVoted,
    episodeId: id,
  });
  const { data: episodeVotes } = useEpisodeVotesQuery({
    initialData: props.episodeVotes,
    episodeId: id,
  });

  const releasedSong: Maybe<Song> = useMemo(() => {
    if (episode) {
      const song = episode.songs.find((song) => song.releasedAtEpisodeId === id)
      return song ? song : null
    }
    return {} as Song
  }, [episode, id])

  const songMap: Record<string, Song> = useMemo(() => {
    let map: Record<string, Song> = {};
    if (episode?.songs) {
      map = episode.songs.reduce<Record<string, Song>>(
        (acc, cur) => ({
          ...acc,
          [cur.episodeSongId]: cur,
        }),
        map
      );
    }
    return map;
  }, [episode]);

  const sortedVotes = useMemo(() => {
    if (episodeVotes) {
      return episodeVotes.sort((a, b) => a.rank - b.rank);
    }
    return [];
  }, [episodeVotes]);

  useEffect(() => {
    if (lastMessage === null) return;

    const data = JSON.parse(lastMessage.data);
    if (data.message) {
      if (data.topic === newSubscriberTopic) {
        setNumOfSubscribers(data.message.numOfSubscribers);
      }
    }
  }, [queryClient, lastMessage, episode]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      fetchNumOfSubscribers(id).then((data) => {
        setNumOfSubscribers(data.numOfSubscribers);
      });
    }
  }, [readyState, id]);

  return (
    <>
      <Head>
        <title>Dennis | Episode {props.episode.episode}</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {episode && episodeVotes ? (
        <div className='w-full pb-4 md:max-w-256 md:pb-8'>
          <div className="w-full px-2">
            <InformationHeader
              episode={episode}
              numOfSubscribers={numOfSubscribers}
            />
          </div>
          {episode?.numOfVotesCasted > 0 ? (
            <div className="w-full">
              <VotePieChart
                episode={episode}
                episodeVotes={episodeVotes}
              />
            </div>
          ) : null}
          <div>
          <div className="p-2">
            <AnimateSharedLayout>
              <AnimatePresence>
                {sortedVotes.map((vote) => {
                  const percentage = (vote.numOfVotes / episode.numOfVotesCasted) * 100;

                  if (percentage === 0) {
                    return (
                      <Fragment key={vote.episodeSongId} />
                    )
                  }  

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
                      isVoted={hasVoted?.episodeSongId === vote.episodeSongId}
                      className="mb-4"
                    />
                  )
                })}
              </AnimatePresence>
            </AnimateSharedLayout>
            {releasedSong && releasedSong.spotifyUrl ? (
              <SpotifyEmbed
                spotifyUrl={releasedSong.spotifyUrl}
              />
            ) : null}
            {releasedSong && releasedSong.youtubeUrl ? (
              <div className="mt-2">
                <YoutubeEmbed
                  youtubeUrl={releasedSong.youtubeUrl}
                />
              </div>
            ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

EpisodeDetail.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default EpisodeDetail;