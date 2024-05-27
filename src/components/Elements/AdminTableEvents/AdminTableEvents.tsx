import { faCheckCircle, faCircleXmark, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from '@/components/Elements/Tooltip.tsx';
import { EventDetailsCard } from '@/features/admin/adminPanel/components/EventDetailsCard.tsx';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';
export const AdminTableEvents = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleTitleClick = async (eventId) => {
    try {
      const response = await axios.get(`/home/events/${eventId}`);
      setSelectedEvent(response.data.result);
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów zgłoszenia:', error);
    }
  };

  const handleCloseCard = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
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
              <td onClick={() => handleTitleClick(row.eventID)} style={{ cursor: 'pointer', color: 'blue' }}>
                {row.title.length > 20 ? `${row.title.substring(0, 20)}...` : row.title}
              </td>
              <td>
                {row.description.length > 20
                  ? `${row.description.substring(0, 20)}...`
                  : row.description}
              </td>
              <td>{formatDateTime(row.eventDate)}</td>
              <td>{formatDateTime(row.reportDate)}</td>
              <td>
                <StatusIconWithTooltip status={row.status} />
              </td>
              {row.status === 'pending' ? (
                <>
                  <td>
                    <Icon>
                      <Tooltip message={'Potwierdź'}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </Tooltip>
                    </Icon>
                  </td>
                  <td>
                    <Icon>
                      <Tooltip message={'Odrzuć'}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </Tooltip>
                    </Icon>
                  </td>
                </>
              ) : row.status === 'approved' ? (
                <td colSpan={2}>
                  <Icon>
                    <Tooltip message={'Odrzuć'}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </Tooltip>
                  </Icon>
                </td>
              ) : row.status === 'rejected' ? (
                <td colSpan={2}>
                  <Icon>
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
      {selectedEvent && <EventDetailsCard event={selectedEvent} onClose={handleCloseCard} />}
    </div>
  );
};

const StyledTable = styled.table`
  width: 70%;
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
