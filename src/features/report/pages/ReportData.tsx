import { IFormInput, ReportDataForm } from '@/features/report/components/ReportDataForm.tsx';

export const ReportData = () => {
  const localData = localStorage.getItem('reportData');

  const defaultValues = {
    description: '',
    title: '',
    phone: '',
    eventDate: new Date().toISOString().split('.')[0],
  };

  if (!localData) {
    return <ReportDataForm initialValues={defaultValues} />;
  }
  return <ReportDataForm initialValues={JSON.parse(localData) as IFormInput} />;
};
