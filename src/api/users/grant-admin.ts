import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, GetUserParams } from './types';

import { getUsersQueryOptions } from '@/api/users/get-users.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const grantAdmin = (userID: GetUserParams['userID']): Promise<User> => {
  return apiClient.patch(`/users/grant_admin/${userID}`);
};

interface UseGrantAdminOptions {
  mutationConfig?: MutationConfig<typeof grantAdmin>;
}

export const useGrantAdmin = ({ mutationConfig }: UseGrantAdminOptions = {}) => {
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
    mutationFn: grantAdmin,
  });
};
