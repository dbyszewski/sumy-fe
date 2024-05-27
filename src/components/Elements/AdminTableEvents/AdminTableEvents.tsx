import { faCheckCircle, faCircleXmark, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';

export const AdminTableEvents = () => {
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

  const handleApprove = async (eventId) => {
    try {
      await axios.put(`/home/events/approve/${eventId}`);
      setTableData((prevData) =>
        prevData.map((event) =>
          event.eventID === eventId ? { ...event, status: 'accepted' } : event
        )
      );
    } catch (error) {
      console.error('Błąd podczas zatwierdzania zgłoszenia:', error);
    }
  };

  const handleReject = async (eventId) => {
    try {
      await axios.put(`/home/events/reject/${eventId}`);
      setTableData((prevData) =>
        prevData.map((event) =>
          event.eventID === eventId ? { ...event, status: 'rejected' } : event
        )
      );
    } catch (error) {
      console.error('Błąd podczas odrzucania zgłoszenia:', error);
    }
  };

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
          <th colSpan={2}>Akcje</th>
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
            <td>
              <StatusIconWithTooltip status={row.status} />
            </td>
            {row.status === 'pending' ? (
              <>
                <td>
                  <Icon onClick={() => handleApprove(row.eventID)}>
                    <Tooltip message={'Potwierdź'}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </Tooltip>
                  </Icon>
                </td>
                <td>
                  <Icon onClick={() => handleReject(row.eventID)}>
                    <Tooltip message={'Odrzuć'}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </Tooltip>
                  </Icon>
                </td>
              </>
            ) : row.status === 'accepted' ? (
              <td colSpan={2}>
                <Icon onClick={() => handleReject(row.eventID)}>
                  <Tooltip message={'Odrzuć'}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </Tooltip>
                </Icon>
              </td>
            ) : row.status === 'rejected' ? (
              <td colSpan={2}>
                <Icon onClick={() => handleApprove(row.eventID)}>
                  <Tooltip message={'Potwierdź'}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </Tooltip>
                </Icon>
              </td>
            ) : (
              <td colSpan={2}>
                <Tooltip message={'Błąd statusu'}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </Tooltip>
              </td>
            )}
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
