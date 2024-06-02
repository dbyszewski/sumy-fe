import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { DateTime } from '@/components/Elements/InputFields/DateTime';
import { TextInput } from '@/components/Elements/InputFields/Text';
import { TextArea } from '@/components/Elements/InputFields/TextArea';

const schema = yup
  .object({
    title: yup.string().required('Tytuł jest wymagany'),
    phone: yup
      .string()
      .required('Numer telefonu jest wymagany')
      .matches(/^\+48\d{9}$/, 'Niepoprawny numer telefonu'),
    description: yup.string().required('Opis jest wymagany'),
    eventDate: yup.string().required('Data zdarzenia jest wymagana'),
  })
  .required();

export interface IFormInput {
  title: string;
  phone: string;
  description: string;
  eventDate: string;
}

type ReportDataFormProps = {
  initialValues?: IFormInput;
};

export const ReportDataForm = ({ initialValues }: ReportDataFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema), defaultValues: initialValues });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // save data in local storage
    const jsonData = JSON.stringify(data);
    localStorage.setItem('reportData', jsonData);
    navigate('/report/location');
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <TextInput label="Tytuł" {...field} error={errors.title?.message} />}
        name="title"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextArea label="Opis" {...field} error={errors.description?.message} />
        )}
        name="description"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput label="Numer telefonu" {...field} error={errors.phone?.message} />
        )}
        name="phone"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <DateTime
            label="Data zdarzenia"
            id="eventDate"
            max={new Date().toISOString().split('.')[0]}
            {...field}
            error={errors.eventDate?.message}
          />
        )}
        name="eventDate"
        control={control}
      />
      <Button>Dalej</Button>
    </FormContainer>
  );
};
