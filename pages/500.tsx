import Head from 'next/head';
import Image from 'next/image';
import { Layout } from '../components/organisms';

const ServerError = () => {
  return (
    <>
      <Head>
        <title>Dennis | Not Found</title>
        <meta name="description" content="Predict Chainsaw Man's Ending Song" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col items-center pt-2 md:pt-8 md:max-w-256">
        <div className="py-8">
          <div className="md:hidden">
            <Image
              alt="cat cry"
              src="/cry-pochita.gif"
              height={100}
              width={100}
              className="rounded-md"
            />
          </div>
          <div className="hidden md:block">
            <Image
              alt="cat cry"
              src="/cry-pochita.gif"
              height={500}
              width={500}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="text-white md:text-4xl">
          Something went wrong!
        </div>
      </div>
    </>
  );
}

ServerError.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default ServerError