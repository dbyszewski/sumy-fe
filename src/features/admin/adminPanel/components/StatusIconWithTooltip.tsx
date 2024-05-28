import { faBan, faClock, faThumbsUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';

export const getStatusMappedName = (status) => {
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

const getStatusIcon = (status) => {
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

export const StatusIconWithTooltip = ({ status }) => {
  return (
    <Tooltip message={getStatusMappedName(status)}>
      <FontAwesomeIcon icon={getStatusIcon(status)} />
    </Tooltip>
  );
};
