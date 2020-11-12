import { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';

import { useToast } from '../hooks/toast';
import getValidationErrors from '../utils/getValidationErrors';

import Input from '../components/Input';
import Button from '../components/Button';

import { Container, Content, AnimationContainer } from '../../styles/pages/Reset-Password';
import api from '../libs/api';
import {
  schemaResetPassword,
  isSchemaValidationError,
} from '../utils/schemas';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const router = useRouter();
  

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        await schemaResetPassword.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        const token = router.query.token;

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        router.push('/signup');

        addToast({
          type: 'success',
          title: 'Você já pode logar com sua nova senha!',
        });
      } catch (err) {
        if (isSchemaValidationError(err)) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, router],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;
