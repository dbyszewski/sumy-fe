import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { FilesUpload } from './pages/FilesUpload';
import { LocationSelect } from './pages/LocationSelect';
import { ReportData } from './pages/ReportData';

export const ReportRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
        children={
          <>
            <Route path="/data" element={<ReportData />} />
            <Route path="/location" element={<LocationSelect />} />
            <Route path="/files" element={<FilesUpload />} />
            <Route path="*" element={<h1>404</h1>} />
          </>
        }
      />
    </Routes>
  );
};
