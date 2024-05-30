import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Title } from '@/components/Elements/Headers/Title';
import { axios } from '@/lib/axios.ts';
import nullable from '@/types/nullable.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderBoolean } from '@/utils/tableHelper';

interface User {
  userID: number;
  userName: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  isPhoneVerified: boolean;
  isMailVerified: boolean;
  isAdmin: boolean;
  lockedAt: nullable<string>;
}

export const UserDetailsCard = () => {
  const [user, setUser] = useState<nullable<User>>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data.result as User);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleBackButtonClick = useCallback(() => {
    window.history.back();
  }, []);

  if (!user) {
    return null;
  }

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
          <ColumnLeft>Numer telefonu:</ColumnLeft>
          <ColumnRight>{user.phone}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Adres email:</ColumnLeft>
          <ColumnRight>{user.email}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Status:</ColumnLeft>
          <ColumnRight>{user.status}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Telefon zweryfikowany:</ColumnLeft>
          <ColumnRight>{renderBoolean(user.isPhoneVerified)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Email zweryfikowany:</ColumnLeft>
          <ColumnRight>{renderBoolean(user.isMailVerified)} </ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Admin</ColumnLeft>
          <ColumnRight>{renderBoolean(user.isAdmin)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Zablokowany:</ColumnLeft>
          <ColumnRight>{renderBoolean(user.lockedAt)}</ColumnRight>
        </Row>
        <Row>
          <ColumnLeft>Data zablokowania:</ColumnLeft>
          <ColumnRight>{formatDateTime(user.lockedAt)}</ColumnRight>
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
