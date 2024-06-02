import { queryOptions, useQuery } from '@tanstack/react-query';

import { User, GetUserParams } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getUser = ({ userID }: GetUserParams): Promise<User> => {
  return apiClient.get(`/users/get_user/${userID}`);
};

export const getUserQueryOptions = (userID: GetUserParams['userID']) => {
  return queryOptions({
    queryKey: ['users', userID],
    queryFn: () => getUser({ userID }),
  });
};

interface UseUserOptions extends GetUserParams {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
}

export const useUser = ({ userID, queryConfig }: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(userID),
    ...queryConfig,
  });
};
