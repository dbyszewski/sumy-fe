import { faTrash, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import { useChangeVisibilityEvent } from '@/api/events/change-visibility-event.ts';
import { useDeleteEvent } from '@/api/events/delete-event.ts';
import { useEvents } from '@/api/events/get-events.ts';
import { Event } from '@/api/events/types.ts';
import { Table, ActionProps, ColumnProps, TableLink } from '@/components/Elements/Table';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import { useNotifications } from '@/hooks/useNotifications.ts';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderEllipsis, renderVisibility } from '@/utils/tableHelper.tsx';

interface UserEventsTableProps {
  filter?: {
    userID?: number;
  };
  maxRows?: number;
}

export const UserEventsTable = ({ filter, maxRows }: UserEventsTableProps) => {
  const eventsQuery = useEvents();
  const notifications = useNotifications();
  const deleteEvent = useDeleteEvent({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Zgłoszenie usunięte',
          type: 'success',
        });
      },
    },
  });

  const changeVisibilityEvent = useChangeVisibilityEvent({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Widoczność zgłoszenia została zmieniona',
          type: 'success',
        });
      },
    },
  });

  const columns: Array<ColumnProps<Event>> = [
    {
      key: 'title',
      title: 'Tytuł',
      render: (_, item) => (
        <TableLink to={`/user/events/${item.eventID}`}>{renderEllipsis(item.title)}</TableLink>
      ),
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
      icon: faEyeSlash,
      hidden: (item) => !item.visibility,
      onClick: (item) => handleVisibility(item.eventID),
      colorVariant: 'warning',
    },
    {
      key: 'show',
      title: 'Pokaż',
      icon: faEye,
      hidden: (item) => item.visibility,
      onClick: (item) => handleVisibility(item.eventID),
      colorVariant: 'success',
    },
    {
      key: 'delete',
      title: 'Usuń',
      icon: faTrash,
      onClick: (item) => handleDelete(item.eventID),
      colorVariant: 'danger',
    },
  ];

  const handleVisibility = async (eventId: number) => {
    try {
      await changeVisibilityEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas zmiany widoczności zgłoszenia:', error);
    }
  };

  const handleDelete = async (eventId: number) => {
    try {
      await deleteEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas usuwania zdarzenia:', error);
    }
  };

  const tableData = _.filter(eventsQuery.data, (event) => {
    if (filter?.userID) {
      return filter?.userID === event.user.userID;
    }
    return true;
  });

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
