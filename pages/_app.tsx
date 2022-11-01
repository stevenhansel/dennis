import '../styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

type Props = {
  dehydratedState: any
}

function MyApp({ Component, pageProps }: AppProps<Props>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
