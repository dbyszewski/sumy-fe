import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { TextInput } from '@/components/Elements/InputFields/Text';
import { useAuth } from '@/hooks/useAuth.ts';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email('Musi być poprawnym emailem').required('Email jest wymagany'),
    password: yup
      .string()
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(20, 'Hasło może mieć maksymalnie 20 znaków')
      .required('Hasło jest wymagane'),
  })
  .required();

export const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const { loginAction } = useAuth();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      loginAction({
        username: data.email,
        password: data.password,
      });
    } catch (error) {
      // TODO: Handle error depending on backend response
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Logowanie" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <TextInput label="Email" {...field} error={errors.email?.message} />}
        name="email"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextInput label="Hasło" type="password" {...field} error={errors.password?.message} />
        )}
        name="password"
        control={control}
      />
      <Button disabled={isLoading}>Zaloguj się</Button>
    </FormContainer>
  );
};
