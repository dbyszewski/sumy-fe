import { queryOptions, useQuery } from '@tanstack/react-query';

import { Event, GetEventParams } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getEvent = ({ eventID }: GetEventParams): Promise<Event> => {
  return apiClient.get(`/events/authenticated/${eventID}`);
};

export const getEventQueryOptions = (eventID: GetEventParams['eventID']) => {
  return queryOptions({
    queryKey: ['events', eventID],
    queryFn: () => getEvent({ eventID }),
  });
};

interface UseEventOptions extends GetEventParams {
  queryConfig?: QueryConfig<typeof getEventQueryOptions>;
}

export const useEvent = ({ eventID, queryConfig }: UseEventOptions) => {
  return useQuery({
    ...getEventQueryOptions(eventID),
    ...queryConfig,
  });
};
