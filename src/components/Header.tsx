import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiPower } from 'react-icons/fi';

import {
  Container,
  Principal,
  FooterForm,
  Logo,
  Navbar,
  Profile,
} from '../../styles/components/Header';

import Button from './Button';
import Input from './Input';

import { useAuth } from '../hooks/auth';
import { useToast } from '../hooks/toast';
import getValidationErrors from '../utils/getValidationErrors';
import { schemaLogin, isSchemaValidationError } from '../utils/schemas';

interface SignInFormData {
  email: string;
  password: string;
}

const Header: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, signOut, user } = useAuth();
  const { addToast } = useToast();

  const LoginForm = useCallback(() => {
    const handleSubmit = async (data: SignInFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        await schemaLogin.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (isSchemaValidationError(err)) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    };

    return (
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h5>Área do anunciante</h5>
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <FooterForm>
          <Button type="submit">Entrar</Button>
          <Link href="/forgot-password">Esqueci minha senha</Link>
        </FooterForm>
      </Form>
    );
  }, [addToast, signIn]);

  const isLoggedIn = useCallback(() => {
    return user ? (
      <Profile>
        <img
          src={user.avatar_url ? user.avatar_url : '/assets/unknown.jpg'}
          alt={user.name}
        />
        <div>
          <span>Bem vindo!</span>
          <a href="/profile">
            <strong>{user.name}</strong>
          </a>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </div>
      </Profile>
    ) : (
      <LoginForm />
    );
  }, [user, signOut, LoginForm]);

  return (
    <Container>
      <Principal>
        <Logo>
          <img src="assets/logoalvin.svg" alt="Imovéis de luxo" />
        </Logo>
        {isLoggedIn()}
      </Principal>
      <Navbar>
        <Link href="/">Principal</Link>
        <Link href="/advertisement-registration">Anuncie aqui</Link>
        <Link href="/advertisement-search">Busca de Imoveis</Link>
        <Link href="/Faq">Informações</Link>
        <Link href="contacts/">Contato</Link>
      </Navbar>
    </Container>
  );
};

export default Header;
