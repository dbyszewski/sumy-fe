import { faAdn } from '@fortawesome/free-brands-svg-icons';
import { faLock, faUnlock, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

import { useDeleteUser } from '@/api/users/delete-user.ts';
import { useUsers } from '@/api/users/get-users.ts';
import { useGrantAdmin } from '@/api/users/grant-admin.ts';
import { useLockUser } from '@/api/users/lock-user.ts';
import { useRevokeAdmin } from '@/api/users/revoke-admin.ts';
import { User } from '@/api/users/types.ts';
import { useUnlockUser } from '@/api/users/unlock-user.ts';
import { Table, ColumnProps, ActionProps, TableLink } from '@/components/Elements/Table';
import { useNotifications } from '@/hooks/useNotifications.ts';
import { renderAdmin, renderBoolean, renderEllipsis, renderLocked } from '@/utils/tableHelper';

export const AdminUsersTable = () => {
  const usersQuery = useUsers();
  const notifications = useNotifications();
  const lockUser = useLockUser({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Zablokoawno użytkownika',
          type: 'success',
        });
      },
    },
  });

  const unlockUser = useUnlockUser({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Odblokowano użytkownika',
          type: 'success',
        });
      },
    },
  });
  const grantAdmin = useGrantAdmin({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Przyznano uprawnienia administratora',
          type: 'success',
        });
      },
    },
  });
  const revokeAdmin = useRevokeAdmin({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Odebrano uprawnienia administratora',
          type: 'success',
        });
      },
    },
  });
  const deleteUser = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          message: 'Usunięto użytkownika',
          type: 'success',
        });
      },
    },
  });
  const columns: Array<ColumnProps<User>> = [
    {
      key: 'userName',
      title: 'Nazwa użytkownika',
      render: (_, item) => (
        <TableLink to={`/admin/users/${item.userID}`}>{renderEllipsis(item.userName)}</TableLink>
      ),
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'isMailVerified',
      title: 'Email zweryfikowany',
      render: (_, item) => renderBoolean(item.isMailVerified),
    },
    {
      key: 'isAdmin',
      title: 'Admin',
      render: (_, item) => renderAdmin(item.isAdmin),
    },
    {
      key: 'lockedAt',
      title: 'Zablokowany',
      render: (_, item) => renderLocked(!!item.lockedAt),
    },
  ];

  const actions: Array<ActionProps<User>> = [
    {
      key: 'grant_admin',
      title: 'Dodaj uprawnienia administratora',
      icon: faAdn,
      hidden: (item) => item.isAdmin,
      onClick: (item) => handleGrantAdmin(item.userID),
      colorVariant: 'primary',
    },
    {
      key: 'revoke_admin',
      title: 'Zabierz uprawnienia administratora',
      icon: faUser,
      hidden: (item) => !item.isAdmin,
      onClick: (item) => handleRevokeAdmin(item.userID),
      colorVariant: 'primary',
    },
    {
      key: 'lock',
      title: 'Zablokuj',
      icon: faLock,
      hidden: (item) => item.lockedAt !== null,
      onClick: (item) => handleLock(item.userID),
      colorVariant: 'warning',
    },
    {
      key: 'unlock',
      title: 'Odblokuj',
      icon: faUnlock,
      hidden: (item) => item.lockedAt === null,
      onClick: (item) => handleUnlock(item.userID),
      colorVariant: 'success',
    },
    {
      key: 'delete',
      title: 'Usuń',
      icon: faTrash,
      onClick: (item) => handleDelete(item.userID),
      colorVariant: 'danger',
    },
  ];

  const handleLock = async (userId: number) => {
    try {
      await lockUser.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas blokowania użytkownika:', error);
      notifications.addNotification({
        message: 'Błąd podczas blokowania użytkownika',
        type: 'error',
      });
    }
  };
  const handleUnlock = async (userId: number) => {
    try {
      await unlockUser.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas odblokowywania użytkownika:', error);
      notifications.addNotification({
        message: 'Błąd podczas odblokowywania użytkownika',
        type: 'error',
      });
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error);
      notifications.addNotification({
        message: 'Błąd podczas usuwania użytkownika',
        type: 'error',
      });
    }
  };

  const handleGrantAdmin = async (userId: number) => {
    try {
      await grantAdmin.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas przyznawania uprawnień użytkownikowi:', error);
      notifications.addNotification({
        message: 'Błąd podczas przyznawania uprawnień użytkownikowi',
        type: 'error',
      });
    }
  };

  const handleRevokeAdmin = async (userId: number) => {
    try {
      await revokeAdmin.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas odbierania uprawnień użytkownikowi:', error);
      notifications.addNotification({
        message: 'Błąd podczas odbierania uprawnień użytkownikowi',
        type: 'error',
      });
    }
  };

  return <Table columns={columns} data={usersQuery.data} actions={actions} maxRows={10} />;
};
