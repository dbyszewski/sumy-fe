import { queryOptions, useQuery } from '@tanstack/react-query';

import { Event } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getEvents = (): Promise<Event[]> => {
  return apiClient.get(`/events`);
};

export const getEventsQueryOptions = () => {
  return queryOptions({
    queryKey: ['events'],
    queryFn: getEvents,
  });
};
type UseEventsOptions = {
  queryConfig?: QueryConfig<typeof getEventsQueryOptions>;
};

export const useEvents = ({ queryConfig }: UseEventsOptions = {}) => {
  return useQuery({
    ...getEventsQueryOptions(),
    ...queryConfig,
  });
};
