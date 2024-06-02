import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateEventInput, Event } from './types';

import { getEventsQueryOptions } from '@/api/events/get-events.ts';
import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createEvent = ({ data }: { data: CreateEventInput }): Promise<Event> => {
  const token = localStorage.getItem('site');
  return apiClient.post(`/events/${token ? 'authenticated' : 'not_authenticated'}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

type UseCreateEventOptions = {
  mutationConfig?: MutationConfig<typeof createEvent>;
};

export const useCreateEvent = ({ mutationConfig }: UseCreateEventOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEventsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createEvent,
  });
};
