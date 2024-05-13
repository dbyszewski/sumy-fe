import { useState } from 'react';
import styled from 'styled-components';

export const Tooltip = ({ children, status }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusName = () => {
    switch (status) {
      case 'pending':
        return 'Oczekujący';
      case 'approved':
        return 'Zatwierdzony';
      case 'rejected':
        return 'Odrzucony';
      default:
        return '';
    }
  };

  return (
    <TooltipWrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && <TooltipText>{getStatusName()}</TooltipText>}
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  background-color: #232323;
  color: white;
  text-align: center;
  padding: 0.5rem;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
`;
