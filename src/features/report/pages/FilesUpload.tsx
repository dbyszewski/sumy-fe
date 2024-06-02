import { ChangeEvent, useState } from 'react';

import { FileSelect } from '@/features/report/components/FileSelect.tsx';

export const FilesUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    appendFiles(files);
  };

  const appendFiles = (newFiles: File | FileList) => {
    if (newFiles instanceof FileList) {
      setFiles([...files, ...newFiles]);
      return;
    }
    setFiles([...files, newFiles]);
  };

  const handleRemoveFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  return (
    <FileSelect
      onChange={handleFileChange}
      onRemoveFile={handleRemoveFile}
      value={files}
      name="event-file"
    />
  );
};
