import { faCheck, faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';

export const renderBoolean = (value: boolean) => {
  return value ? (
    <StyledIcon icon={faCheck} value={value} />
  ) : (
    <StyledIcon icon={faXmark} value={value} />
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

const StyledIcon = styled(FontAwesomeIcon)<{ value: boolean }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.buttons.success : theme.colors.buttons.danger};
`;
