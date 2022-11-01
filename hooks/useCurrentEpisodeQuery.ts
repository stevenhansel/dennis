import { useQuery, InitialDataFunction } from 'react-query'

import type { CurrentEpisode } from '../types/model'
import request from '../utils/request'

const fetchCurrentEpisode = async () => {
  const data = await request<CurrentEpisode>({
    uri: '/v1/episodes/current',
    method: 'GET',
  })
  return data
}

type Props = {
  initialData?: CurrentEpisode;
}

const useCurrentEpisodeQuery = ({ initialData }: Props) => {
  return useQuery(
   ['currentEpisode'],
   () => fetchCurrentEpisode(),
   { initialData })
}

export { useCurrentEpisodeQuery, fetchCurrentEpisode }
