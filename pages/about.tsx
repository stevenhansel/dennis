import Head from 'next/head'
import Link from 'next/link';

import { Layout } from '../components/organisms';

const About = () => {
  const repoFrontendUrl = process.env.NEXT_PUBLIC_REPO_FRONTEND_URL ?? ""
  const repoBackendUrl = process.env.NEXT_PUBLIC_REPO_BACKEND_URL ?? ""
  return (
    <>
      <Head>
        <title>Dennis | About</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='w-full text-white p-2 md:max-w-256 md:p-8'>
        <h2>
          We are not affiliated with Chainsaw Man.
          We created this site because we want to join the hype of chainsaw man.
          Therefore, we do not intend to make any profit from this website.
        </h2>
        <br />
        <h6>
          The source code for this project is also available at the following link:
        </h6>
        <div className='flex flex-col'>
          <div className='flex'>
            <div className='mr-2'>
              •
            </div>
            <Link href={repoFrontendUrl} passHref>
              <a target="_blank" rel="noopener noreferrer" className='hover:text-gray-400'>
                Frontend
              </a>
            </Link> 
          </div>
          <div className='flex'>
            <div className='mr-2'>
              •
            </div>
            <Link href={repoBackendUrl} passHref>
              <a target="_blank" rel="noopener noreferrer" className='hover:text-gray-400'>
                Backend
              </a>
            </Link> 
          </div>
        </div>
      </div>
    </>
  )
}

About.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default About