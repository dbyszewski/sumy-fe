import styled from 'styled-components';

import { useUser } from '@/api/users/get-user.ts';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderAdmin, renderBoolean, renderLocked } from '@/utils/tableHelper';

export const UserInfo = () => {
  const userId = localStorage.getItem('userID');
  const userQuery = useUser({ userID: userId });

  if (userQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (userQuery.isError || !userQuery.data) {
    return <div>Wystąpił błąd podczas ładowania danych</div>;
  }

  const user = userQuery.data;

  return (
    <RowsContainer>
      <Row>
        <ColumnLeft>Nazwa użytkownika:</ColumnLeft>
        <ColumnRight>{user.userName}</ColumnRight>
      </Row>

      <Row>
        <ColumnLeft>Adres email:</ColumnLeft>
        <ColumnRight>{user.email}</ColumnRight>
      </Row>
      <Row>
        <ColumnLeft>Email zweryfikowany:</ColumnLeft>
        <ColumnRight>{renderBoolean(user.isMailVerified)} </ColumnRight>
      </Row>
      <Row>
        <ColumnLeft>Numer telefonu:</ColumnLeft>
        <ColumnRight>{user.phone} </ColumnRight>
      </Row>
      <Row>
        <ColumnLeft>Admin</ColumnLeft>
        <ColumnRight>{renderAdmin(user.isAdmin)}</ColumnRight>
      </Row>
      <Row>
        <ColumnLeft>Zablokowany:</ColumnLeft>
        {user.lockedAt ? (
          <Tooltip button={false} message={formatDateTime(user.lockedAt)}>
            {renderLocked(user.lockedAt)}
          </Tooltip>
        ) : (
          renderLocked(user.lockedAt)
        )}
      </Row>
    </RowsContainer>
  );
};

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.elements.light};
  gap: 0.5rem;
  word-break: break-word;
  height: auto;
  padding: 0.5rem 0;
`;

const ColumnLeft = styled.div`
  font-weight: bold;
  flex: 0 0 150px;
  text-align: end;
  padding-right: 0.5rem;
`;

const ColumnRight = styled.div`
  flex: 1;
  align-self: flex-end;
`;
