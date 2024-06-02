import { queryOptions, useQuery } from '@tanstack/react-query';

import { DownloadedImage, DownloadImageParams } from './types';

import { apiClient } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const downloadEventImage = ({
  eventID,
  fileID,
}: DownloadImageParams): Promise<DownloadedImage> => {
  return apiClient.get(`/events/get_file_for_event_id/${eventID}/files/${fileID}`, {
    responseType: 'arraybuffer',
  });
};

export const downloadEventImageQueryOptions = ({ eventID, fileID }: DownloadImageParams) => {
  return queryOptions({
    queryKey: ['events', eventID, 'files', fileID],
    queryFn: () => downloadEventImage({ eventID, fileID }),
  });
};

interface UseEventOptions extends DownloadImageParams {
  queryConfig?: QueryConfig<typeof downloadEventImageQueryOptions>;
}

export const useEventImage = ({ eventID, fileID, queryConfig }: UseEventOptions) => {
  return useQuery({
    ...downloadEventImageQueryOptions({ eventID, fileID }),
    ...queryConfig,
  });
};
