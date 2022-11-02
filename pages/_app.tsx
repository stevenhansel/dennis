import '../styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'

import { NextPageWithLayout } from '../types/component'

type Props = {}
type ComponentProps = {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppProps<Props> & ComponentProps) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  )
}

export default MyApp
