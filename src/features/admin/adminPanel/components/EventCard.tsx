import styled from 'styled-components';

import { Button } from '@/components/Elements/Button';

export const EventCard = ({ title, children, onClose }) => {
  return (
    <Overlay>
      <CardWrapper>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <Button size={'sm'} variant={'secondary'} onClick={onClose}>
            X
          </Button>
        </CardHeader>
        {children}
      </CardWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  height: 80%;
  max-height: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  margin: 0;
`;
