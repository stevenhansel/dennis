import Head from "next/head";

import { Layout } from "../../components/organisms";
import { EpisodeCard } from "../../components/molecules";

import { fetchEpisodes, useEpisodesQuery } from "../../hooks/useEpisodesQuery";

import type { NextPageWithLayout } from "../../types/component";
import type { Episode } from "../../types/model";

export const getServerSideProps = async () => {
  try {
    const episodes = await fetchEpisodes();
    return {
      props: {
        episodes,
      },
    };
  } catch (_) {
    return {
      props: {
        errorCode: 500,
      },
    }
  }
};

type Props = {
  episodes: Episode[];
};

const Episodes: NextPageWithLayout<Props> = (props) => {
  const { data: episodes } = useEpisodesQuery({ initialData: props.episodes });

  return (
    <>
      <Head>
        <title>Dennis | Episodes</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-8 flex flex-col items-center w-full px-2 md:px-4 md:max-w-256">
        {episodes?.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} className="mb-2 md:mb-4" />
        ))}
      </div>
    </>
  );
};

Episodes.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Episodes;
