import { queryOptions, useQuery } from '@tanstack/react-query';

import { User } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getUsers = (): Promise<User[]> => {
  return apiClient.get(`/users`);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
