import styled from 'styled-components';

import { useMe } from '@/api/users/token-me.ts';
import { Button } from '@/components/Elements/Button';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { useNotifications } from '@/hooks/useNotifications.ts';
import { apiClient } from '@/lib/api-client.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderAdmin, renderBoolean, renderLocked } from '@/utils/tableHelper';

export const UserInfo = () => {
  const userQuery = useMe();
  const notifications = useNotifications();

  const handleSendVerifyMail = async () => {
    try {
      await apiClient.patch('/users/send_verification_email');
      notifications.addNotification({
        message: 'Wysłano mail weryfikacyjny',
        type: 'success',
      });
    } catch (error) {
      console.error('Błąd podczas wysyłania maila weryfikacyjnego:', error);
    }
  };

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
      {!user.isMailVerified && (
        <Row>
          <ColumnLeft>
            <Button onClick={handleSendVerifyMail}>Wyślij e-mail weryfikacyjny</Button>
          </ColumnLeft>
        </Row>
      )}
    </RowsContainer>
  );
};

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  word-break: break-word;
  height: auto;
  padding: 0.5rem 0;
`;

const ColumnLeft = styled.div`
  font-weight: bold;
  flex: 0 0 170px;
  text-align: left;
  padding-right: 0.5rem;
  width: auto;
`;

const ColumnRight = styled.div`
  flex: 1;
  align-self: flex-end;
`;
