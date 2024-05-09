import { IFormInput, ReportDataForm } from '@/features/report/components/ReportDataForm.tsx';

export const ReportData = () => {
  const initialValues = localStorage.getItem('reportData');

  if (!initialValues) {
    return <ReportDataForm />;
  }
  return <ReportDataForm initialValues={JSON.parse(initialValues) as IFormInput} />;
};
