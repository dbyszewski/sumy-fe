import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Event, GetEventParams } from './types';

import { getEventsQueryOptions } from '@/api/events/get-events.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const rejectEvent = (eventID: GetEventParams['eventID']): Promise<Event> => {
  return apiClient.patch(`/events/reject/${eventID}`);
};

interface UseRejectEventOptions extends GetEventParams {
  mutationConfig?: MutationConfig<typeof rejectEvent>;
}

export const useRejectEvent = ({ mutationConfig }: UseRejectEventOptions = {}) => {
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
    mutationFn: rejectEvent,
  });
};
