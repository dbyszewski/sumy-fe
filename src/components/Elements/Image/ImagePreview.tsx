import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface ImagePreviewProps {
  src: string;
  onClose: () => void;
  open: boolean;
}

export const ImagePreview = ({ src, onClose, open }: ImagePreviewProps) => {
  const modalRoot = document.body;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Modal
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.3 }}>
          <StyledImage
            src={src}
            alt=""
            initial={{
              scale: 0,
              x: '20rem',
            }}
            animate={{
              scale: 1,
              x: 0,
            }}
            exit={{
              scale: 0,
            }}
            transition={{ duration: 0.4, type: 'spring' }}
          />
          <CloseButton
            onClick={onClose}
            initial={{
              scale: 0,
              x: '20rem',
            }}
            animate={{
              scale: 1,
              x: 0,
            }}
            exit={{
              scale: 0,
            }}
            transition={{ duration: 0.4, type: 'spring' }}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
        </Modal>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

const Modal = styled(motion.div)`
  position: fixed;
  top: -20rem;
  left: -20rem;
  padding: 20rem;
  width: calc(100% + 40rem);
  height: calc(100% + 40rem);
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(motion.button)`
  border: none;
  position: absolute;
  top: 21rem;
  right: 21rem;
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-size: 1.75rem;
  cursor: pointer;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.colors.elements.light};
  padding: 0.5rem;
  width: 3rem;
  height: 3rem;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5rem;
`;
