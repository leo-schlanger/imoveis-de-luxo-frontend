/* eslint-disable react/jsx-curly-newline */
import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiBookOpen, FiCheckCircle } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import {
  Container,
  StepView,
  AdvertisementForm,
  Base,
  Address,
  GalleryContainer,
  UploaderView,
  Success,
} from '../../styles/pages/advertisement-registration';

import {} from '../components/Header';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { useAuth } from '../hooks/auth';
import { useToast } from '../hooks/toast';
import getValidationErrors from '../utils/getValidationErrors';
import { CREATE_ADVERTISEMENT } from '../libs/gql/advertisements';

import {
  schemaCreateAdvertisement,
  isSchemaValidationError,
} from '../utils/schemas';
import {
  AdvertisementType,
  PropertyType,
  advertisementTypeDescription,
  propertyTypeDescription,
} from '../libs/entities/advertisements';
import Select from '../components/Select';

import api from '../libs/api';

interface AdvertisementRegistrationData {
  title: string;
  description: string;
  type: AdvertisementType;
  type_property: PropertyType;
  value: number;
  country: string;
  state: string;
  postal_code: number;
  neighborhood: string;
  street: string;
  number: number;
}

const advertisementTypes = ['PURCHASE', 'TENANCY'] as const;

const propertyTypes = [
  'HOME',
  'APARTMENT',
  'PENTHOUSE',
  'GRANGE',
  'FARM',
  'TERRAIN',
  'SHED',
  'CORPORATE',
  'OFFICE',
  'STORE',
  'HOTEL',
  'INN',
  'ISLAND',
  'CUSTOMIZED',
] as const;

const AdvertisementRegistration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [createAdvertisement, { error }] = useMutation(CREATE_ADVERTISEMENT);

  const handleSubmit = useCallback(
    async (data: AdvertisementRegistrationData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        await schemaCreateAdvertisement.validate(data, { abortEarly: false });

        const result = await createAdvertisement({
          variables: {
            ...data,
            value: parseFloat(data.value.toString()),
            status: true,
            address_visible: true,
          },
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ error });
        if (isSchemaValidationError(err)) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, createAdvertisement, error],
  );

  return (
    <Container>
      <AdvertisementForm>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Base>
              <Input name="title" placeholder="Título" />
              <TextArea name="description" placeholder="Descrição" />
              <Input name="value" placeholder="Valor" type="number" />
              <Select
                name="type"
                options={advertisementTypes.map((item) => {
                  return {
                    value: item,
                    label: advertisementTypeDescription[item],
                  };
                })}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: '#c1b994',
                    marginTop: 20,
                    width: 300,
                  }),
                }}
              />
              <Select
                name="type_property"
                options={propertyTypes.map((item) => {
                  return { value: item, label: propertyTypeDescription[item] };
                })}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: '#c1b994',
                    marginTop: 20,
                    width: 300,
                  }),
                }}
              />
            </Base>
            <Address>
              <Input name="country" placeholder="Pais" />
              <Input name="state" placeholder="Estado" />
              <Input name="postal_code" placeholder="CEP" />
              <Input name="neighborhood" placeholder="Bairro" />
              <Input name="street" placeholder="Endereço" />
              <Input name="number" placeholder="Número" />
              <Input name="complement" placeholder="Complemento" />
            </Address>
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </AdvertisementForm>
    </Container>
  );
};

export default AdvertisementRegistration;
