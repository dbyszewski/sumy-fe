import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import { useApproveEvent } from '@/api/events/approve-event.ts';
import { useEvents } from '@/api/events/get-events';
import { useRejectEvent } from '@/api/events/reject-event.ts';
import { Event } from '@/api/events/types';
import { Table, ActionProps, ColumnProps, TableLink } from '@/components/Elements/Table';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip';
import { formatDateTime } from '@/utils/dateHelper';
import { renderEllipsis, renderVisibility } from '@/utils/tableHelper';

interface AdminEventsTableProps {
  filter?: {
    status?: Array<Status>;
  };
  maxRows?: number;
}

type Status = 'pending' | 'accepted' | 'rejected';

export const AdminEventsTable = ({ filter, maxRows }: AdminEventsTableProps) => {
  const eventsQuery = useEvents();
  const approveEvent = useApproveEvent({
    mutationConfig: {
      onSuccess: () => {
        console.log('Zgłoszenie zatwierdzone');
      },
    },
  });

  const rejectEvent = useRejectEvent({
    mutationConfig: {
      onSuccess: () => {
        console.log('Zgłoszenie odrzucone');
      },
    },
  });

  const columns: Array<ColumnProps<Event>> = [
    {
      key: 'title',
      title: 'Tytuł',
      render: (_, item) => <TableLink to={`/admin/events/${item.eventID}`}>{item.title}</TableLink>,
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
      await approveEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas zatwierdzania zgłoszenia:', error);
    }
  };

  const handleReject = async (eventId: number) => {
    try {
      await rejectEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas odrzucania zgłoszenia:', error);
    }
  };

  const tableData = _.filter(eventsQuery.data, (event) => {
    if (filter?.status) {
      return filter.status.includes(event.status);
    }
    return true;
  });

  console.log('tableData', tableData);
  console.log('filter', filter);

  return (
    <Table
      columns={columns}
      data={tableData}
      actions={actions}
      maxRows={maxRows}
      isLoading={eventsQuery.isLoading}
    />
  );
};
