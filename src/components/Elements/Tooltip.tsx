import { useState } from 'react';
import styled from 'styled-components';

export const Tooltip = ({ children, message }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && <TooltipText>{message}</TooltipText>}
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
  z-index: 20;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
`;
