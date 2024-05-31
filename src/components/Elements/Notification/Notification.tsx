import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { ProgressBar } from '@/components/Elements/Notification/ProgressBar.tsx';
import NotificationType from '@/types/notification';

interface NotificationProps extends Omit<NotificationType, 'message'> {
  onDelete: () => void;
  message: ReactNode;
}

export const Notification = ({ type, message, onDelete }: NotificationProps) => {
  return (
    <ToastContainer>
      <Container>
        <IconContainer type={type}>
          <FontAwesomeIcon icon={type === 'success' ? faCheck : faExclamation} />
        </IconContainer>
        <Content>{message}</Content>
        <DeleteButton onClick={onDelete} icon={faXmark} />
      </Container>
      <ProgressBar type={type} />
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.elements.brightLight};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  min-width: 30rem;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 3rem;
`;

const IconContainer = styled.div<{ type: NotificationType['type'] }>`
  color: ${({ theme }) => theme.colors.text.light};
  background-color: ${({ theme, type }) =>
    type === 'success' ? theme.colors.buttons.success : theme.colors.buttons.danger};
  font-size: 1.5rem;

  height: 100%;
  width: 2.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border-right: 2px solid ${({ theme }) => theme.colors.elements.light};
`;

const Content = styled.p`
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-size: 1rem;
  flex-grow: 1;
`;

const DeleteButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-size: 1rem;
  padding: 0.5rem;
  align-self: flex-start;
`;
