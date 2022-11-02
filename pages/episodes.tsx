import Head from 'next/head';
import { Layout } from '../components/organisms';
import { NextPageWithLayout } from '../types/component';
import { fetchEpisodes, useEpisodesQuery } from '../hooks/useEpisodesQuery';
import type { Episode } from '../types/model'
import { EpisodeCard } from '../components/molecules';

export const getServerSideProps = async () => {
  const episodes = await fetchEpisodes();
  return {
    props: {
      episodes,
    }
  }
}

type Props = {
  episodes: Episode[]
}

const Episodes: NextPageWithLayout<Props> = (props) => {
  const { data: episodes } = useEpisodesQuery({ initialData: props.episodes })

  return (
    <div>
      <Head>
        <title>CSM Ending Song Predictions</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-1 md:px-16 md:grid-cols-3">
        {episodes?.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} className="mb-2" />
        ))}
      </main>
    </div>
  )
};

Episodes.getLayout = (page: React.ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Episodes;