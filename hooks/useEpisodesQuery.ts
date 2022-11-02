import { useQuery, InitialDataFunction } from 'react-query'

import type { Episode } from '../types/model'
import request from '../utils/request'

const fetchEpisodes = async () => {
  const data = await request<Episode[]>({
    uri: '/v1/episodes',
    method: 'GET',
  })
  return data
}

type Props = {
  initialData?: Episode[];
}

const useEpisodesQuery = ({ initialData }: Props) => {
  return useQuery(
   ['episodes'],
   () => fetchEpisodes(),
   { initialData })
}

export { useEpisodesQuery, fetchEpisodes }
