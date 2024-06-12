import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { DateTime } from '@/components/Elements/InputFields/DateTime';
import { TextInput } from '@/components/Elements/InputFields/Text';
import { TextArea } from '@/components/Elements/InputFields/TextArea';

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
const roundToMinute = (date: Date) => {
  const newDate = new Date(date);
  newDate.setSeconds(0, 0);
  return newDate;
};

const schema = yup
  .object({
    title: yup.string().required('Tytuł jest wymagany'),
    phone: yup
      .string()
      .matches(/^\+48\d{9}$/, 'Niepoprawny numer telefonu')
      .when([], {
        is: () => !localStorage.getItem('phone'),
        then: (schema) => schema.required('Numer telefonu jest wymagany'),
        otherwise: (schema) => schema.notRequired(),
      }),
    description: yup.string().required('Opis jest wymagany'),
    eventDate: yup
      .date()
      .required('Data zdarzenia jest wymagana')
      .max(
        roundToMinute(new Date()),
        ({ max }) => `Data zdarzenia nie może być późniejsza niż ${max.toLocaleString()}`
      ),
  })
  .required();

export interface IFormInput {
  title: string;
  phone?: string;
  description: string;
  eventDate: Date;
}

type ReportDataFormProps = {
  initialValues?: IFormInput;
};

export const ReportDataForm = ({ initialValues }: ReportDataFormProps) => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [phoneExists, setPhoneExists] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema), defaultValues: initialValues });
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(getFormattedDate(now));
  }, []);

  useEffect(() => {
    const userPhone = localStorage.getItem('phone');
    setPhoneExists(!!userPhone);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
      {!phoneExists && (
        <Controller
          render={({ field }) => (
            <TextInput label="Numer telefonu" {...field} error={errors.phone?.message} />
          )}
          name="phone"
          control={control}
        />
      )}
      <Controller
        render={({ field }) => (
          <DateTime
            {...field}
            label="Data zdarzenia"
            id="eventDate"
            value={currentDateTime}
            error={errors.eventDate?.message}
          />
        )}
        name="eventDate"
        control={control}
      />
      <Button type="submit">Dalej</Button>
    </FormContainer>
  );
};
