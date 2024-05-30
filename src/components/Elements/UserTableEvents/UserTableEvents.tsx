import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Table, ActionProps, ColumnProps, TableLink } from '@/components/Elements/Table';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip';
import { axios } from '@/lib/axios.ts';
import { formatDateTime } from '@/utils/dateHelper';
import { renderEllipsis, renderVisibility } from '@/utils/tableHelper';

interface Event {
  eventID: number;
  phone: string;
  title: string;
  description: string;
  eventDate: string;
  reportDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  visibility: boolean;
  longitude: number;
  latitude: number;
}

export const UserTableEvents = () => {
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
      render: (_, item) => <TableLink to={`/my-events/${item.eventID}`}>{item.title}</TableLink>,
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
      key: 'visibility',
      title: 'Widoczność',
      render: (_, item) => renderVisibility(item.visibility),
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
      key: 'hide',
      title: 'Ukryj',
      icon: faCheck,
      hidden: (item) => !item.visibility,
      onClick: (item) => handleVisibility(item.eventID),
      colorVariant: 'warning',
    },
    {
      key: 'show',
      title: 'Pokaż',
      icon: faXmark,
      hidden: (item) => item.visibility,
      onClick: (item) => handleVisibility(item.eventID),
      colorVariant: 'success',
    },
    {
      key: 'delete',
      title: 'Usuń',
      icon: faXmark,
      onClick: (item) => handleDelete(item.eventID),
      colorVariant: 'secondary',
    },
    {
      key: 'edit',
      title: 'Edytuj',
      icon: faXmark,
      onClick: (item) => handleEdit(item.eventID),
      colorVariant: 'primary',
    },
  ];

  const handleVisibility = async (eventId: number) => {
    try {
      await axios.patch(`/events/visibility/${eventId}`);
      setTableData((prevData) =>
        prevData.map((event) =>
          event.eventID === eventId ? { ...event, visibility: !event.visibility } : event
        )
      );
    } catch (error) {
      console.error('Błąd podczas zatwierdzania zgłoszenia:', error);
    }
  };
  const handleEdit = async (eventId: number) => {
    try {
      await axios.patch(`/events/edit/${eventId}`);
    } catch (error) {
      console.error('Błąd podczas edytowania zgłoszenia:', error);
    }
  };

  const handleDelete = async (eventId: number) => {
    try {
      await axios.delete(`/events/${eventId}`);
      setTableData((prevData) => prevData.filter((event) => event.eventID !== eventId));
    } catch (error) {
      console.error('Błąd podczas usuwania zdarzenia:', error);
    }
  };

  return <Table columns={columns} data={tableData} actions={actions} maxRows={10} />;
};
