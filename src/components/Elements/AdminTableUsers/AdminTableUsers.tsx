import { faAdn } from '@fortawesome/free-brands-svg-icons';
import { faLock, faUnlock, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { Table, ColumnProps, ActionProps } from '@/components/Elements/Table';
import { axios } from '@/lib/axios.ts';
import Nullable from '@/types/nullable.ts';
import { renderBoolean, renderEllipsis } from '@/utils/tableHelper';

interface User {
  userID: number;
  userName: string;
  email: string;
  status: 'active' | 'inactive';
  isPhoneVerified: boolean;
  isMailVerified: boolean;
  isAdmin: boolean;
  lockedAt: Nullable<string>;
}

export const AdminTableUsers = () => {
  const [tableData, setTableData] = useState<Array<User>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/');
        setTableData(response.data.result as Array<User>);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);
  const columns: Array<ColumnProps<User>> = [
    {
      key: 'userName',
      title: 'Nazwa użytkownika',
      render: (_, item) => renderEllipsis(item.userName),
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
      hidden: (item) => item.lockedAt === null,
      onClick: (item) => handleLock(item.userID),
      colorVariant: 'warning',
    },
    {
      key: 'unlock',
      title: 'Odblokuj',
      icon: faUnlock,
      hidden: (item) => item.lockedAt !== null,
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
      await axios.put(`/users/lock/${userId}`);
      setTableData((prevData) =>
        prevData.map((user) =>
          user.userID === userId ? { ...user, lockedAt: 'zablokowany' } : user
        )
      );
    } catch (error) {
      console.error('Błąd podczas blokowania użytkownika:', error);
    }
  };
  const handleUnlock = async (userId: number) => {
    try {
      await axios.put(`/users/unlock/${userId}`);
      setTableData((prevData) =>
        prevData.map((user) => (user.userID === userId ? { ...user, lockedAt: null } : user))
      );
    } catch (error) {
      console.error('Błąd podczas odblokowywania użytkownika:', error);
    }
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`/users/${userId}`);
      setTableData((prevData) => prevData.filter((user) => user.userID !== userId));
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error);
    }
  };

  const handleGrantAdmin = async (userId: number) => {
    try {
      await axios.patch(`/users/grant_admin/${userId}`);
      setTableData((prevData) =>
        prevData.map((user) => (user.userID === userId ? { ...user, isAdmin: true } : user))
      );
    } catch (error) {
      console.error('Błąd podczas dodawania uprawnień użytkownikowi:', error);
    }
  };

  const handleRevokeAdmin = async (userId: number) => {
    try {
      await axios.patch(`/users/revoke_admin/${userId}`);
      setTableData((prevData) =>
        prevData.map((user) => (user.userID === userId ? { ...user, isAdmin: false } : user))
      );
    } catch (error) {
      console.error('Błąd podczas usuwania uprawnień użytkownikowi:', error);
    }
  };

  return <Table columns={columns} data={tableData} actions={actions} maxRows={10} />;
};
