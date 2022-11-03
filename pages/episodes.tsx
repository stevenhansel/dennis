import Head from "next/head";
import { Layout } from "../components/organisms";
import { NextPageWithLayout } from "../types/component";
import { fetchEpisodes, useEpisodesQuery } from "../hooks/useEpisodesQuery";
import type { Episode } from "../types/model";
import { EpisodeCard } from "../components/molecules";

export const getServerSideProps = async () => {
  const episodes = await fetchEpisodes();
  return {
    props: {
      episodes,
    },
  };
};

type Props = {
  episodes: Episode[];
};

const Episodes: NextPageWithLayout<Props> = (props) => {
  const { data: episodes } = useEpisodesQuery({ initialData: props.episodes });

  return (
    <div>
      <Head>
        <title>CSM Ending Song Predictions</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-8 flex flex-col items-center">
        <div className="w-full px-4 md:w-4/5 max-w-[1024px]">
          {episodes?.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} className="mb-2 md:mb-4" />
          ))}
        </div>
      </main>
    </div>
  );
};

Episodes.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Episodes;
