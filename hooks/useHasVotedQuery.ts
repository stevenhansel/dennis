import { useQuery } from 'react-query'

import type { HasVoted } from '../types/model'
import request from '../utils/request'

const fetchHasVoted = async (episodeId: number) => {
  const data = await request<HasVoted>({
    uri: `/v1/episodes/${episodeId}/has_voted`,
    method: 'GET',
  })
  return data
}

type Props = {
  initialData?: HasVoted;
  episodeId: number;
}

const useHasVotedQuery = ({ initialData, episodeId }: Props) => {
  return useQuery(
   ['hasVoted'],
   () => fetchHasVoted(episodeId),
   { initialData })
}

export { useHasVotedQuery, fetchHasVoted }
