import styled from 'styled-components';

export const AdminTable = () => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Numer telefonu</th>
          <th>Nazwa użytkownika</th>
          <th>Tytuł</th>
          <th>Data wydarzenia</th>
          <th>Data zgłoszenia</th>
          <th>Opis</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>Jakis status</td>
        </tr>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>Jakis status</td>
        </tr>
        <tr>
          <td>123 123 123</td>
          <td>Hymel Jadwiga</td>
          <td>Styrta się pali</td>
          <td>2024-10-05 23:59:00</td>
          <td>2024-10-05 23:59:40</td>
          <td>Ja nie wiem kto podpalił</td>
          <td>Jakis status</td>
        </tr>
        {/*{data.map((row, index) => (*/}
        {/*  <tr key={index}>*/}
        {/*    <td>{row.phoneNumber}</td>*/}
        {/*    <td>{row.username}</td>*/}
        {/*    <td>{row.title}</td>*/}
        {/*    <td>{row.eventDate}</td>*/}
        {/*    <td>{row.reportDate}</td>*/}
        {/*    <td>{row.description}</td>*/}
        {/*    <td>{row.status}</td>*/}
        {/*  </tr>*/}
        {/*))}*/}
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;

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

  td:not(:last-child) {
    border-right: 1px solid #232323;
  }
`;
