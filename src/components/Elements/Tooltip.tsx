import { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: ReactNode;
  message: string;
  button: boolean;
}

export const Tooltip = ({ children, message, button }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return button ? (
    <TooltipWrapperButton
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {children}
      {showTooltip && <TooltipText>{message}</TooltipText>}
    </TooltipWrapperButton>
  ) : (
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
const TooltipWrapperButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  word-break: normal;
`;
