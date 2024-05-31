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
    <Tooltip message={value}>
      <div style={{ maxWidth: '20rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
    </Tooltip>
  );
};
export const renderVisibility = (value: boolean) => {
  return value ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />;
};
export const renderAdmin = (value: ReactNode) => {
  return value ? (
    <StyledIcon icon={faAdn} value={!!value} />
  ) : (
    <StyledIcon icon={faUser} value={!!value} />
  );
};

export const renderLocked = (value: ReactNode) => {
  return value ? (
    <StyledIcon icon={faLock} value={!value} />
  ) : (
    <StyledIcon icon={faUnlock} value={!value} />
  );
};

const StyledIcon = styled(FontAwesomeIcon)<{ value: boolean }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.buttons.success : theme.colors.buttons.danger};
`;
