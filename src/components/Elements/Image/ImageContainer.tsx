import { useMemo } from 'react';
import styled from 'styled-components';

import { useEventImage } from '@/api/events/download-image.ts';
import { ImageComponent } from '@/components/Elements/Image/Image.tsx';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';

interface ImageProps {
  fileID: string;
  eventID: string;
}

export const ImageContainer = ({ eventID, fileID }: ImageProps) => {
  const eventImageQuery = useEventImage({ eventID, fileID });

  const renderContent = useMemo(() => {
    if (eventImageQuery.isLoading) {
      return <LoadingSpinner />;
    }
    if (eventImageQuery.isError) {
      return <div>Wystąpił błąd podczas ładowania zdjęcia</div>;
    }
    if (!eventImageQuery.data) return <div>Brak zdjęcia</div>;

    const blob = new Blob([eventImageQuery.data.data], { type: eventImageQuery.data.contentType });
    const url = URL.createObjectURL(blob);
    return <ImageComponent url={url} eventID={eventID} fileID={fileID} />;
  }, [eventImageQuery]);

  return <Container>{renderContent}</Container>;
};

const Container = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
  flex: 1;
  min-width: 20rem;
  background-color: ${({ theme }) => theme.colors.elements.light};
`;
