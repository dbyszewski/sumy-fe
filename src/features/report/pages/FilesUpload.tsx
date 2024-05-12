import { ChangeEvent, useState } from 'react';

import { FileSelect } from '@/features/report/components/FileSelect.tsx';

export const FilesUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const file = files?.[0] ?? null;
    setFile(file);
  };

  return <FileSelect onChange={handleFileChange} value={file} name="event-file" />;
};
