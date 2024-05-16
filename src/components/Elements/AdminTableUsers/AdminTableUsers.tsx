import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';

export const AdminTableUsers = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home/events/?skip=0&limit=25');
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
          <th>Numer telefonu</th>
          <th>Nazwa użytkownika</th>
          <th>Tytuł</th>
          <th>Opis</th>
          <th>Data zdarzenia</th>
          <th>Data zgłoszenia</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.phone}</td>
            <td>{row.userName}</td>
            <td>{row.title}</td>
            <td>{row.description}</td>
            <td>{formatDateTime(row.eventDate)}</td>
            <td>{formatDateTime(row.reportDate)}</td>
            <td>{getStatusIcon(row.status)}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
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
