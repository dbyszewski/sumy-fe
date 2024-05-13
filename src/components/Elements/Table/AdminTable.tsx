import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { axios } from '@/lib/axios.ts';
export const AdminTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home/events');
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
          <th>Data wydarzenia</th>
          <th>Data zgłoszenia</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Jakis status</td>
        </tr>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Jakis status</td>
        </tr>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Jakis status</td>
        </tr>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.phone}</td>
            <td>{row.userName}</td>
            <td>{row.title}</td>
            <td>{row.description}</td>
            <td>{row.eventDate}</td>
            <td>{row.reportDate}</td>
            <td>{row.status}</td>
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
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #dddddd;
  }
`;
