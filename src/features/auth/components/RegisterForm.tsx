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
  confirmPassword: string;
}

const schema = yup
  .object({
    email: yup.string().email('Musi być poprawnym emailem').required('Email jest wymagany'),
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
  // const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      alert('Register form data: ' + JSON.stringify(data));
      // TODO: Implement login
      navigate('/');
    } catch (error) {
      // TODO: Handle error depending on backend response
    } finally {
      // setLoading(false);
    }
  };

  return (
    <FormContainer title="Rejestracja" onSubmit={handleSubmit(onSubmit)}>
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
      <Button size="md" variant="primary">
        Zarejestruj się
      </Button>
    </FormContainer>
  );
};
