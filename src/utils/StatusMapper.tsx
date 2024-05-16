import { faBan, faClock, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';

export const getStatusMappedName = (status) => {
  switch (status) {
    case 'pending':
      return 'Oczekujący';
    case 'approved':
      return 'Zatwierdzony';
    case 'rejected':
      return 'Odrzucony';
    default:
      return status;
  }
};

export const getStatusIconWithTooltip = (status) => {
  let icon = null;
  switch (status) {
    case 'pending':
      icon = faClock;
      break;
    case 'approved':
      icon = faThumbsUp;
      break;
    case 'rejected':
      icon = faBan;
      break;
    default:
      return status;
  }

  return (
    <Tooltip message={getStatusMappedName(status)}>
      <FontAwesomeIcon icon={icon} />
    </Tooltip>
  );
};
