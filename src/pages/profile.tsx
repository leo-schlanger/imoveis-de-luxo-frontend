import { useCallback, useRef, ChangeEvent, useMemo, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import api from '../libs/api';

import { useToast } from '../hooks/toast';
import { useAuth } from '../hooks/auth';

import { schemaEditProfile, isSchemaValidationError } from '../utils/schemas';
import getValidationErrors from '../utils/getValidationErrors';

import { FIND_USERS_ADVERTISEMENTS } from '../libs/gql/advertisements';
import { Advertisement } from '../libs/entities/advertisements';

import Input from '../components/Input';
import Button from '../components/Button';

import {
  Container,
  Content,
  AvatarInput,
  AddTable,
} from '../../styles/pages/Profile';
import SEO from '../components/SEO';

interface IQueryData {
  advertisements: {
    list: Advertisement[];
    total: number;
  };
}

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { user, updateUser } = useAuth();
  const [page] = useState(1);
  const [per_page] = useState(8);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        await schemaEditProfile.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (isSchemaValidationError(err)) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
        });
      }
    },
    [addToast, updateUser],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const imageURL = useMemo(() => {
    return user.avatar_url ? user.avatar_url : '/assets/unknown.jpg';
  }, [user.avatar_url]);

  const { data } = useQuery<IQueryData>(FIND_USERS_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
      user_id: user.id,
    },
  });

  return (
    <>
      <SEO title="Meu perfil" />
      <Container>
        <header>
          <div>
            <Link href="/">
              <FiArrowLeft />
            </Link>
          </div>
        </header>

        <Content>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <AvatarInput>
              <img data-testid="image" src={imageURL} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />

                <input
                  type="file"
                  id="avatar"
                  onChange={handleAvatarChange}
                  data-testid="input-file"
                />
              </label>
            </AvatarInput>

            <h1>Meu Perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              containerStyle={{ marginTop: 24 }}
              name="old_password"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
            />
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
              placeholder="Confirmar senha"
            />
            <Button type="submit">Confirmar mudanças</Button>
          </Form>
          <AddTable>
            {data &&
              data.advertisements.list.map((advertisement) => (
                <li>
                  <Link href={`advertisement-details/${advertisement.id}`}>
                    <img src="assets/casa.svg" alt="house" />
                    <h6>{advertisement.title}</h6>
                    <hr />
                    <p>Venda</p>
                    <h6>Rio de janeiro</h6>
                    <p>{advertisement.property.value}</p>
                    <h6>Preço</h6>
                    <hr />
                  </Link>
                </li>
              ))}
          </AddTable>
        </Content>
      </Container>
    </>
  );
};

export default Profile;

// puxa o anuncio pelo id do usuario e adcionar a edição no addetails
