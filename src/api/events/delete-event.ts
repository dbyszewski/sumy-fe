import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Event, GetEventParams } from './types';

import { getEventsQueryOptions } from '@/api/events/get-events.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const deleteEvent = (eventID: GetEventParams['eventID']): Promise<Event> => {
  return apiClient.delete(`/events/delete_event/${eventID}`);
};

interface UseDeleteEventOptions {
  mutationConfig?: MutationConfig<typeof deleteEvent>;
}

export const useDeleteEvent = ({ mutationConfig }: UseDeleteEventOptions = {}) => {
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
    mutationFn: deleteEvent,
  });
};
