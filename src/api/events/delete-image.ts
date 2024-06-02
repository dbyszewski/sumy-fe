import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DownloadImageParams } from './types';

import { getEventsQueryOptions } from '@/api/events/get-events.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteEventImage = ({ eventID, fileID }: DownloadImageParams): Promise<never> => {
  return apiClient.delete(`/events/${eventID}/files/${fileID}`);
};

interface UseDeleteEventImageOptions {
  mutationConfig?: MutationConfig<typeof deleteEventImage>;
}

export const useDeleteEvent = ({ mutationConfig }: UseDeleteEventImageOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getEventsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: deleteEventImage,
  });
};
