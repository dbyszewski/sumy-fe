import { faAdn } from '@fortawesome/free-brands-svg-icons';
import {
  faCheck,
  faLock,
  faUnlock,
  faXmark,
  faEye,
  faEyeSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';

export const renderBoolean = (value: ReactNode) => {
  return value ? (
    <StyledIcon icon={faCheck} value={!!value} />
  ) : (
    <StyledIcon icon={faXmark} value={!!value} />
  );
};

export const renderEllipsis = (value: string) => {
  return (
    <Tooltip button={false} message={value}>
      <div style={{ maxWidth: '20rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </Tooltip>
  );
};
export const renderVisibility = (value: boolean) => {
  return value ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />;
};
export const renderAdmin = (value: ReactNode) => {
  return value ? <StyledAdminIcon icon={faAdn} /> : <StyledAdminIcon icon={faUser} />;
};

export const renderLocked = (value: ReactNode) => {
  return value ? (
    <StyledLockedIcon icon={faLock} value={!!value} />
  ) : (
    <StyledLockedIcon icon={faUnlock} value={!!value} />
  );
};

const StyledIcon = styled(FontAwesomeIcon)<{ value: boolean }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.buttons.success : theme.colors.buttons.danger};
`;
const StyledAdminIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.buttons.primary};
`;
const StyledLockedIcon = styled(FontAwesomeIcon)<{ value: boolean }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.buttons.warning : theme.colors.buttons.success};
`;
