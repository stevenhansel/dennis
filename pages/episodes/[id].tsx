import { NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { VotePieChart, YoutubeEmbed } from '../../components/molecules';
import { Layout } from '../../components/organisms';

import type { NextPageWithLayout } from "../../types/component";
import { CurrentEpisode, EpisodeVote, Maybe, Song } from '../../types/model';

import {
  fetchEpisodeById,
  useEpisodeByIdQuery,
} from "../../hooks/useEpisodeByIdQuery";

import {
  fetchEpisodeVotes,
  useEpisodeVotesQuery,
} from "../../hooks/useEpisodeVotesQuery";


export const getServerSideProps = async (context: NextPageContext) => {
  const { id } = context.query;
  const episode = await fetchEpisodeById(parseInt(id as string, 10));
  const episodeVotes = await fetchEpisodeVotes(parseInt(id as string, 10));

  return {
    props: {
      episodeVotes,
      episode,
    },
  };
};

type Props = {
  episode: CurrentEpisode;
  episodeVotes: EpisodeVote[];
};

const EpisodeDetail: NextPageWithLayout<Props> = (props) => {
  const router = useRouter();

  const id = parseInt(router.query.id as string, 10)

  const { data: episode } = useEpisodeByIdQuery({
    initialData: props.episode,
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

  return (
    <>
      <Head>
        <title>Dennis | Episode {props.episode.episode}</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full pb-4 md:max-w-256 md:pb-8'>
        <div className="w-full text-white p-2 md:p-4">
          <h1 className="mt-0 md:mt-2 text-sm md:text-xl lg:text-4xl font-semibold mb-1">
            {episode?.episodeName ? episode.episodeName : "???"}
          </h1>
          <div className='my-2 md:text-lg lg:text-xl'>
            Episode {episode?.episode}
          </div>
          <div className=''>
            Total votes: {episode?.numOfVotesCasted}
          </div>
        </div>
        {releasedSong && releasedSong.youtubeUrl ? (
          <YoutubeEmbed
            youtubeUrl={releasedSong.youtubeUrl}
          />
        ) : null}
        {episode && episodeVotes && episode?.numOfVotesCasted > 0 ? (
          <>
            <div className='w-full text-center text-white font-bold py-2 md:py-8'>
              Vote Result
            </div>
            <div className="w-full">
              <VotePieChart
                episode={episode}
                episodeVotes={episodeVotes}
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

EpisodeDetail.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default EpisodeDetail;