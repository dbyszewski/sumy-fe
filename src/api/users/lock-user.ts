import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, GetUserParams } from './types';

import { getUsersQueryOptions } from '@/api/users/get-users.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const lockUser = (userID: GetUserParams['userID']): Promise<User> => {
  return apiClient.patch(`/users/lock/${userID}`);
};

interface UseLockUserOptions extends GetUserParams {
  mutationConfig?: MutationConfig<typeof lockUser>;
}

export const useLockUser = ({ mutationConfig }: UseLockUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: lockUser,
  });
};
