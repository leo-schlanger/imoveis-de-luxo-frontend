import { useRef, useCallback, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../hooks/toast';
import getValidationErrors from '../utils/getValidationErrors';

import Input from '../components/Input';
import Button from '../components/Button';

import { Container, Content, AnimationContainer } from '../../styles/pages/Forgot-Password';
import api from '../libs/api';
import {
  schemaForgotPassword,
  isSchemaValidationError,
} from '../utils/schemas';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        await schemaForgotPassword.validate(data, { abortEarly: false });

        await api.post('password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado.',
          description:
            'Enviamos um e-mail para confirmar recuperação de senha, cheque sua caixa de entrada.',
        });
      } catch (err) {
        if (isSchemaValidationError(err)) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
