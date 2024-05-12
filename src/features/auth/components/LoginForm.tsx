import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Button } from '@/components/Elements/Button';
import { FormContainer } from '@/components/Elements/Form/Container';
import { TextInput } from '@/components/Elements/InputFields/Text';

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
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // TODO: Implement login
      alert('Login form data: ' + JSON.stringify(data));
      navigate('/');
    } catch (error) {
      // TODO: Handle error depending on backend response
    } finally {
      // setLoading(false);
    }
  };

  return (
    <FormContainer title="Logowanie" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <TextInput label="Email" size="md" {...field} error={errors.email?.message} />
        )}
        name="email"
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
      <Button size="md" variant="primary">
        Zaloguj się
      </Button>
    </FormContainer>
  );
};
