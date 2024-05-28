import { useEffect, useState } from 'react';

import { Table, ColumnProps } from '@/components/Elements/Table';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/?skip=0&limit=25');
        setTableData(response.data.result as Array<User>);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={columns} data={tableData} />;
};
