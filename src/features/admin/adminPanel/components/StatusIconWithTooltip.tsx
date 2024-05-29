import { faBan, faClock, faThumbsUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';

type Status = 'pending' | 'accepted' | 'rejected';

export const getStatusMappedName = (status: Status) => {
  switch (status) {
    case 'pending':
      return 'Oczekujący';
    case 'accepted':
      return 'Zatwierdzony';
    case 'rejected':
      return 'Odrzucony';
    default:
      return status;
  }
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case 'pending':
      return faClock;
    case 'accepted':
      return faThumbsUp;
    case 'rejected':
      return faBan;
    default:
      return faQuestionCircle;
  }
};

const statusToColor = (status: Status) => {
  switch (status) {
    case 'pending':
      return 'default';
    case 'accepted':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'warning';
  }
};

interface StatusIconWithTooltipProps {
  status: Status;
  colored: boolean;
}

export const StatusIconWithTooltip = ({ status, colored }: StatusIconWithTooltipProps) => {
  return (
    <Tooltip message={getStatusMappedName(status)}>
      <ColoredDiv colored={colored} status={status}>
        <FontAwesomeIcon icon={getStatusIcon(status)} />
      </ColoredDiv>
    </Tooltip>
  );
};

const ColoredDiv = styled.div<StatusIconWithTooltipProps>`
  color: ${({ colored, status, theme }) =>
    colored ? theme.colors.buttons[statusToColor(status)] : 'inherit'};
`;
