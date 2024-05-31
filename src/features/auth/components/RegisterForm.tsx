import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { TextInput } from '@/components/Elements/InputFields/Text';
import { useNotifications } from '@/hooks/useNotifications.ts';
import { apiClient } from '@/lib/api-client.ts';

interface IFormInput {
  email: string;
  userName?: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    userName: yup.string().optional(),
    email: yup.string().email('Musi być poprawnym emailem').required('Email jest wymagany'),
    phone: yup
      .string()
      .required('Numer telefonu jest wymagany')
      .matches(/^\+48\d{9}$/, 'Niepoprawny numer telefonu'),
    password: yup
      .string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(20, 'Hasło może mieć maksymalnie 20 znaków')
      .required('Hasło jest wymagane'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Hasła muszą być takie same')
      .required('Potwierdzenie hasła jest wymagane'),
  })
  .required();

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const notifications = useNotifications();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await apiClient.post('/users', data);
      notifications.addNotification({
        type: 'success',
        message: 'Zarejestrowano pomyślnie',
      });

      navigate('/auth/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Rejestracja" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <TextInput
            label="Nazwa Użytkownika"
            size="md"
            {...field}
            error={errors.userName?.message}
          />
        )}
        name="userName"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput label="Email" size="md" {...field} error={errors.email?.message} />
        )}
        name="email"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput label="Numer telefonu" size="md" {...field} error={errors.phone?.message} />
        )}
        name="phone"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput
            label="Hasło"
            size="md"
            type="password"
            {...field}
            error={errors.password?.message}
          />
        )}
        name="password"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput
            label="Potwierdź hasło"
            size="md"
            type="password"
            {...field}
            error={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
        control={control}
      />
      <Button disabled={loading || (isSubmitted && !isValid)}>Zarejestruj się</Button>
    </FormContainer>
  );
};
