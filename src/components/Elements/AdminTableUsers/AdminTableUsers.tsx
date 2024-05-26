import {
  faLock,
  faUnlock,
  faTrash,
  faCheckCircle,
  faCircleXmark,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';

export const AdminTableUsers = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home/users/?skip=0&limit=25');
        setTableData(response.data.result);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Nazwa użytkownika</th>
          <th>Numer telefonu</th>
          <th>Email</th>
          <th>Czy potwierdzony numer telefonu?</th>
          <th>Czy potwierdzony email?</th>
          <th>Data zablokowania użytkownika</th>
          <th>Status</th>
          <th colSpan={3}>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.userName}</td>
            <td>{row.phone}</td>
            <td>{row.email}</td>
            <td>
              {row.is_phone_verified ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} />
              )}
            </td>
            <td>
              {row.is_email_verified ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} />
              )}{' '}
            </td>
            <td>
              {row.locked_at ? (
                formatDateTime(row.locked_at)
              ) : (
                <FontAwesomeIcon icon={faQuestionCircle} />
              )}
            </td>
            <td>{row.locked_at ? 'zablokowany' : 'aktywny'}</td>
            {row.locked_at ? (
              <td>
                <Tooltip message={'Odblokuj'}>
                  <Icon>
                    <FontAwesomeIcon icon={faUnlock} />
                  </Icon>
                </Tooltip>
              </td>
            ) : (
              <td>
                <Tooltip message={'Blokuj'}>
                  <Icon>
                    <FontAwesomeIcon icon={faLock} />
                  </Icon>
                </Tooltip>
              </td>
            )}
            <td>
              <Tooltip message={'Usuń'}>
                <Icon>
                  <FontAwesomeIcon icon={faTrash} />
                </Icon>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  border: 1px solid ${({ theme }) => theme.colors.elements.dark};
  border-radius: 1rem;
  overflow: hidden;
  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  tr {
    background-color: ${({ theme }) => theme.colors.elements.light};
    color: ${({ theme }) => theme.colors.text.dark};
  }

  th {
    background-color: ${({ theme }) => theme.colors.elements.dark};
    color: ${({ theme }) => theme.colors.text.light};
  }

  tbody tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.elements.brightLight};
  }
`;

const Icon = styled.i`
  cursor: pointer;
`;
