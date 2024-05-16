import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/Elements/Button';
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
            <td>{row.is_phone_verified}</td>
            <td>{row.is_email_verified}</td>
            <td>{formatDateTime(row.locked_at)}</td>
            <td>{row.locked_at ? 'zablokowany' : 'aktywny'}</td>
            <td>
              <Button size={'sm'} variant={'secondary'}>
                Blokuj
              </Button>
            </td>
            <td>
              <Button size={'sm'} variant={'primary'}>
                Odblokuj
              </Button>
            </td>
            <td>
              <Button size={'sm'} variant={'secondary'}>
                Usuń
              </Button>
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
  background-color: #f9f9f9;
  border: 1px solid #232323;

  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  th {
    background-color: #232323;
    color: white;
  }

  tbody tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
