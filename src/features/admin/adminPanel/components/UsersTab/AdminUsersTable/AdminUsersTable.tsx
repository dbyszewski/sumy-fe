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
import { renderBoolean, renderEllipsis } from '@/utils/tableHelper';

export const AdminUsersTable = () => {
  const usersQuery = useUsers();
  const lockUser = useLockUser({
    mutationConfig: {
      onSuccess: () => {
        console.log('Użytkownik zablokowany');
      },
    },
  });

  const unlockUser = useUnlockUser({
    mutationConfig: {
      onSuccess: () => {
        console.log('Użytkownik odblokowany');
      },
    },
  });
  const grantAdmin = useGrantAdmin({
    mutationConfig: {
      onSuccess: () => {
        console.log('Przyznano użytkownikowi uprawnienia administratora');
      },
    },
  });
  const revokeAdmin = useRevokeAdmin({
    mutationConfig: {
      onSuccess: () => {
        console.log('Odebrano użytkownikowi uprawnienia administratora');
      },
    },
  });
  const deleteUser = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        console.log('Użytkownik usunięty');
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
      key: 'status',
      title: 'Status',
    },
    {
      key: 'isPhoneVerified',
      title: 'Telefon zweryfikowany',
      render: (_, item) => renderBoolean(item.isPhoneVerified),
    },
    {
      key: 'isMailVerified',
      title: 'Email zweryfikowany',
      render: (_, item) => renderBoolean(item.isMailVerified),
    },
    {
      key: 'isAdmin',
      title: 'Admin',
      render: (_, item) => renderBoolean(item.isAdmin),
    },
    {
      key: 'lockedAt',
      title: 'Zablokowany',
      render: (_, item) => renderBoolean(!!item.lockedAt),
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
    }
  };
  const handleUnlock = async (userId: number) => {
    try {
      await unlockUser.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas odblokowywania użytkownika:', error);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error);
    }
  };

  const handleGrantAdmin = async (userId: number) => {
    try {
      await grantAdmin.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas przyznawania uprawnień użytkownikowi:', error);
    }
  };

  const handleRevokeAdmin = async (userId: number) => {
    try {
      await revokeAdmin.mutateAsync(userId);
    } catch (error) {
      console.error('Błąd podczas odbierania uprawnień użytkownikowi:', error);
    }
  };

  return <Table columns={columns} data={usersQuery.data} actions={actions} maxRows={10} />;
};
