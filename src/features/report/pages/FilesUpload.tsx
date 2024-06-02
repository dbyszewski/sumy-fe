import { useState } from 'react';

import { FileSelect } from '@/features/report/components/FileSelect.tsx';

export const FilesUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const appendFiles = (newFiles: File | File[]) => {
    console.log(newFiles);
    if (newFiles instanceof Array) {
      setFiles([...files, ...newFiles]);
      return;
    }
    setFiles([...files, newFiles]);
  };

  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  const handleDrop = (newFiles: File[]) => {
    appendFiles(newFiles);
  };

  return (
    <FileSelect
      onDrop={handleDrop}
      onRemoveFile={handleRemoveFile}
      value={files}
      name="event-file"
    />
  );
};
