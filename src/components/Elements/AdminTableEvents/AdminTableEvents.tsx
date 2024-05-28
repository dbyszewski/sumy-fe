import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Table, ActionProps, ColumnProps } from '@/components/Elements/Table';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip';
import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper';
import { renderEllipsis } from '@/utils/tableHelper';

interface Event {
  eventID: number;
  phone: string;
  title: string;
  description: string;
  eventDate: string;
  reportDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  longitude: number;
  latitude: number;
}

export const AdminTableEvents = () => {
  const [tableData, setTableData] = useState<Array<Event>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/events/');
        setTableData(response.data.result as Array<Event>);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  const columns: Array<ColumnProps<Event>> = [
    {
      key: 'title',
      title: 'Tytuł',
    },
    {
      key: 'description',
      title: 'Opis',
      render: (_, item) => renderEllipsis(item.description),
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, item) => <StatusIconWithTooltip status={item.status} colored />,
    },
    {
      key: 'eventDate',
      title: 'Data zdarzenia',
      render: (_, item) => formatDateTime(item.eventDate),
    },
    {
      key: 'reportDate',
      title: 'Data zgłoszenia',
      render: (_, item) => formatDateTime(item.reportDate),
    },
  ];

  const actions: Array<ActionProps<Event>> = [
    {
      key: 'accept',
      title: 'Zatwierdź',
      icon: faCheck,
      hidden: (item) => item.status === 'accepted',
      onClick: (item) => handleApprove(item.eventID),
      colorVariant: 'success',
    },
    {
      key: 'reject',
      title: 'Odrzuć',
      icon: faXmark,
      hidden: (item) => item.status === 'rejected',
      onClick: (item) => handleReject(item.eventID),
      colorVariant: 'danger',
    },
  ];

  const handleApprove = async (eventId: number) => {
    try {
      await axios.put(`/events/approve/${eventId}`);
      setTableData((prevData) =>
        prevData.map((event) =>
          event.eventID === eventId ? { ...event, status: 'accepted' } : event
        )
      );
    } catch (error) {
      console.error('Błąd podczas zatwierdzania zgłoszenia:', error);
    }
  };

  const handleReject = async (eventId: number) => {
    try {
      await axios.put(`/events/reject/${eventId}`);
      setTableData((prevData) =>
        prevData.map((event) =>
          event.eventID === eventId ? { ...event, status: 'rejected' } : event
        )
      );
    } catch (error) {
      console.error('Błąd podczas odrzucania zgłoszenia:', error);
    }
  };

  return <Table columns={columns} data={tableData} actions={actions} />;
};
