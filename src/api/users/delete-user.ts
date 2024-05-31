import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, GetUserParams } from './types';

import { getUsersQueryOptions } from '@/api/users/get-users.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteUser = (userID: GetUserParams['userID']): Promise<User> => {
  return apiClient.delete(`/users/${userID}`);
};

interface UseDeleteUserOptions {
  mutationConfig?: MutationConfig<typeof deleteUser>;
}

export const useDeleteUser = ({ mutationConfig }: UseDeleteUserOptions = {}) => {
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
    mutationFn: deleteUser,
  });
};
