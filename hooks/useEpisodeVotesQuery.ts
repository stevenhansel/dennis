import { useQuery, InitialDataFunction } from 'react-query'

import type { EpisodeVote } from '../types/model'
import request from '../utils/request'

const fetchEpisodeVotes = async (episodeId: number) => {
  const data = await request<EpisodeVote[]>({
    uri: `/v1/episodes/${episodeId}/votes`,
    method: 'GET',
  })
  return data
}

type Props = {
  initialData?: EpisodeVote[];
  episodeId: number;
}

const useEpisodeVotesQuery = ({ initialData, episodeId }: Props) => {
  return useQuery(
   ['episodeVotes'],
   () => fetchEpisodeVotes(episodeId),
   { initialData })
}

export { useEpisodeVotesQuery, fetchEpisodeVotes }
