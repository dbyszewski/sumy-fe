import { faFileCirclePlus, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const ReportButton = () => {
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate('/report/');
  }, [navigate]);

  const reportVariants = {
    hidden: {
      x: 100,
    },
    visible: {
      x: 0,
    },
  };

  const hideButtonVariants = {
    hidden: {
      rotate: 180,
    },
    visible: {
      rotate: 0,
    },
  };

  return (
    <>
      <StyledButton
        onClick={handleClick}
        initial={isHidden ? 'visible' : 'hidden'}
        animate={isHidden ? 'hidden' : 'visible'}
        exit={isHidden ? 'visible' : 'hidden'}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        variants={reportVariants}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </StyledButton>
      <HideButton
        onClick={() => setIsHidden(!isHidden)}
        initial={isHidden ? 'visible' : 'hidden'}
        animate={isHidden ? 'hidden' : 'visible'}
        exit={isHidden ? 'visible' : 'hidden'}
        variants={hideButtonVariants}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </HideButton>
    </>
  );
};

const StyledButton = styled(motion.button)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 3rem;
  right: 2rem;
  z-index: 50;
  height: 6rem;
  width: 6rem;
  border-radius: 5rem;
  background-color: ${({ theme }) => theme.colors.elements.darkRed};
  border: 0.15rem solid ${({ theme }) => theme.colors.elements.light};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
  }
`;

const HideButton = styled(motion.button)`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 9rem;
  right: 0;
  z-index: 50;
  height: 2rem;
  width: 2rem;
  color: ${({ theme }) => theme.colors.elements.darkRed};
  font-size: 2rem;
  cursor: pointer;
  background: none;
  border: none;
  @media (max-width: 768px) {
    bottom: 7rem;
  }
`;
