import { queryOptions, useQuery } from '@tanstack/react-query';

import { User } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getMe = (): Promise<User> => {
  return apiClient.get(`/token/me`);
};

export const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: getMe,
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getMeQueryOptions>;
};

export const useMe = ({ queryConfig }: UseUserOptions = {}) => {
  return useQuery({
    ...getMeQueryOptions(),
    ...queryConfig,
  });
};
