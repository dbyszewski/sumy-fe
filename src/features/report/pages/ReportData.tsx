import { IFormInput, ReportDataForm } from '@/features/report/components/ReportDataForm.tsx';

export const ReportData = () => {
  const localData = localStorage.getItem('reportData');
  const userPhone = localStorage.getItem('phone');

  const defaultValues = {
    description: '',
    title: '',
    phone: userPhone || '', // Zawsze pobieraj numer telefonu z localStorage, jeśli jest dostępny
    eventDate: new Date(),
  };

  const initialValues = localData ? (JSON.parse(localData) as IFormInput) : defaultValues;

  // Nadpisanie phone, jeśli jest dostępny w localStorage
  if (userPhone) {
    initialValues.phone = userPhone;
  }

  return <ReportDataForm initialValues={initialValues} />;
};
