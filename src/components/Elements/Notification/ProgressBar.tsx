import { motion } from 'framer-motion';
import styled from 'styled-components';

import NotificationType from '@/types/notification.ts';

export const ProgressBar = ({ type }: { type: NotificationType['type'] }) => {
  return (
    <ProgressBarContainer>
      <Bar
        className="h-4 rounded-full bg-violet-700"
        initial={{ width: `100%` }}
        transition={{ duration: 3 }}
        type={type}
        whileInView={{ width: 0 }}
      />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.elements.light};
  border-radius: 0.25rem;
  overflow: hidden;
`;

const Bar = styled(motion.div)<{ type: NotificationType['type'] }>`
  height: 100%;
  background-color: ${({ theme, type }) =>
    type === 'success' ? theme.colors.buttons.success : theme.colors.buttons.danger};
  border-radius: 0.25rem;
  border-top: 2px solid ${({ theme }) => theme.colors.elements.light};
`;
