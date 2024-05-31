import { motion } from 'framer-motion';
import styled from 'styled-components';

export const LoadingSpinner = () => {
  return (
    <Container>
      <StyledLoadingSpinner
        animate={{ rotate: [45, 405] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 0.25,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledLoadingSpinner = styled(motion.div)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.5rem solid ${({ theme }) => theme.colors.elements.brightLight};
  border-top: 0.5rem solid ${({ theme }) => theme.colors.elements.darkRed};
  transform: rotate(90deg);
`;
