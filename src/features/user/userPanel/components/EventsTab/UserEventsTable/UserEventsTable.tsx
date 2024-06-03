import { faTrash, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useChangeVisibilityEvent } from '@/api/events/change-visibility-event.ts';
import { useDeleteEvent } from '@/api/events/delete-event.ts';
import { useEditEvent } from '@/api/events/edit-event.ts';
import { useEvents } from '@/api/events/get-events.ts';
import { Event } from '@/api/events/types.ts';
import { Table, ActionProps, ColumnProps, TableLink } from '@/components/Elements/Table';
import { StatusIconWithTooltip } from '@/features/admin/adminPanel/components/StatusIconWithTooltip.tsx';
import { formatDateTime } from '@/utils/dateHelper.ts';
import { renderEllipsis, renderVisibility } from '@/utils/tableHelper.tsx';

export const UserEventsTable = () => {
  const eventsQuery = useEvents();
  const deleteEvent = useDeleteEvent({
    mutationConfig: {
      onSuccess: () => {
        console.log('Zgłoszenie usunięte');
      },
    },
  });
  const editEvent = useEditEvent({
    mutationConfig: {
      onSuccess: () => {
        console.log('Zgłoszenie zedytowane');
      },
    },
  });

  const changeVisibilityEvent = useChangeVisibilityEvent({
    mutationConfig: {
      onSuccess: () => {
        console.log('Widoczność zgłoszenia zmieniona');
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
    {
      key: 'edit',
      title: 'Edytuj',
      icon: faPenToSquare,
      onClick: (item) => handleEdit(item.eventID),
      colorVariant: 'primary',
    },
  ];

  const handleVisibility = async (eventId: number) => {
    try {
      await changeVisibilityEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas zmiany widoczności zgłoszenia:', error);
    }
  };
  const handleEdit = async (eventId: number) => {
    try {
      await editEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas edycji zgłoszenia:', error);
    }
  };

  const handleDelete = async (eventId: number) => {
    try {
      await deleteEvent.mutateAsync(eventId);
    } catch (error) {
      console.error('Błąd podczas usuwania zdarzenia:', error);
    }
  };

  return <Table columns={columns} data={eventsQuery.data} actions={actions} maxRows={10} />;
};
