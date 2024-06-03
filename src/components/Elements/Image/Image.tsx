import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useDeleteEvent } from '@/api/events/delete-image.ts';
import { ImagePreview } from '@/components/Elements/Image/ImagePreview';
import { useNotifications } from '@/hooks/useNotifications.ts';

interface ImageProps {
  url: string;
  fileID?: string;
  eventID?: string;
  onDelete?: () => void;
}

export const ImageComponent = ({ url, fileID, eventID, onDelete }: ImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notification = useNotifications();

  const deleteEventImage = useDeleteEvent({
    mutationConfig: {
      onSuccess: () => {
        notification.addNotification({
          message: 'Usunięto zdjęcie',
          type: 'success',
        });
      },
    },
  });

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleDelete = async () => {
    try {
      if (onDelete) onDelete();
      if (!eventID || !fileID) return;
      await deleteEventImage.mutateAsync({ eventID, fileID });
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error);
    }
  };

  return (
    <AnimatePresence>
      <RelativeContainer>
        <ImageOverlay
          initial={{ opacity: 0, y: '-20rem' }}
          animate={{ opacity: 'inherit', y: 0 }}
          exit={{ opacity: 0, y: '20rem' }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.5, type: 'spring' }}
          onClick={toggleModal}>
          <StyledImage src={url} />
        </ImageOverlay>
        {onDelete || (fileID && eventID) ? (
          <DeleteButton onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </DeleteButton>
        ) : null}
      </RelativeContainer>
      <ImagePreview src={url} open={isModalOpen} onClose={toggleModal} />
    </AnimatePresence>
  );
};

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageOverlay = styled(motion.button)`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  min-height: 4rem;

  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled(motion.button)`
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.colors.buttons.danger};
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
`;

const RelativeContainer = styled.div`
  position: relative;
`;
