import axios from 'axios'

type RequestParams = {
  uri: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any
}

type Request = <T = any>(params: RequestParams) => Promise<T>

const request: Request = async <T = any>(params: RequestParams): Promise<T> => {
  const baseUrl = typeof window === 'undefined' ? process.env.BASE_URL : process.env.NEXT_PUBLIC_BASE_URL

  const response = await axios<T>({
    url: baseUrl + params.uri,
    method: params.method,
    data: params.data,
  })

  return response.data
};

export default request 
