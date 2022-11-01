import { useMutation, QueryClient } from 'react-query';

import request from '../utils/request'

type Payload = {
    episodeSongId: number;
};

const insertVote = async (payload: Payload) => {
  await request({
    uri: '/v1/votes',
    method: 'POST',
    data: payload
  });
};

const useVoteMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: insertVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hasVoted'] })
    },
  });

  return mutation;
};

export { useVoteMutation };