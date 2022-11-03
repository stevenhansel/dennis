import { useQuery } from "react-query";

import type { NumOfSubscribers } from "../types/model";
import request from "../utils/request";

const fetchNumOfSubscribers = async (episodeId: number) => {
  const data = await request<NumOfSubscribers>({
    uri: `/v1/subscribers/${episodeId}`,
    method: "GET",
  });
  return data;
};

type Props = {
  initialData?: NumOfSubscribers;
  episodeId: number;
};

const useNumOfSubscribersQuery = ({ initialData, episodeId }: Props) => {
  return useQuery(
    ["numofSubscribers"],
    () => fetchNumOfSubscribers(episodeId),
    {
      initialData,
    }
  );
};

export { useNumOfSubscribersQuery, fetchNumOfSubscribers };
