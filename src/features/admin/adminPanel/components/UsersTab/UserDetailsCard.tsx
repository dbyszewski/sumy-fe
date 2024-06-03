import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '@/api/users/get-user.ts';
import { Title } from '@/components/Elements/Headers/Title';
import { LoadingSpinner } from '@/components/Elements/LoadingSpinner';
import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderAdmin, renderBoolean, renderLocked } from '@/utils/tableHelper';

export const UserDetailsCard = () => {
  const { userId } = useParams();
  const userQuery = useUser({ userID: userId });
  const navigate = useNavigate();

  const handleBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (userQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (userQuery.isError || !userQuery.data) {
    return <div>Wystąpił błąd podczas ładowania danych</div>;
  }

  const user = userQuery.data;

  return (
    <Content>
      <Header>
        <BackButton onClick={handleBackButtonClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
        <Title>Szczegóły użytkownika</Title>
      </Header>
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
    </Content>
  );
};

const Content = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.elements.brightLight};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  overflow: hidden;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.themeDark};
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const Header = styled.div`
  padding: 1rem 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.elements.light};
`;

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
