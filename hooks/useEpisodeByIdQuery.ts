import { useQuery } from 'react-query'

import type { CurrentEpisode } from '../types/model'
import request from '../utils/request'

const fetchEpisodeById = async (episodeId: number) => {
  const data = await request<CurrentEpisode>({
    uri: `/v1/episodes/${episodeId}`,
    method: 'GET',
  })
  return data
}

type Props = {
  episodeId: number,
  initialData?: CurrentEpisode;
}

const useEpisodeByIdQuery = ({ episodeId, initialData }: Props) => {
  return useQuery(
   [`episode/${episodeId}`],
   () => fetchEpisodeById(episodeId),
   { initialData })
}

export { useEpisodeByIdQuery, fetchEpisodeById }
