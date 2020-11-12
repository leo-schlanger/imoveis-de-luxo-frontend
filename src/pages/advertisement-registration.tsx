/* eslint-disable react/jsx-curly-newline */
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiBookOpen,  FiCheckCircle } from 'react-icons/fi';

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
  const [current, setCurrent] = useState(0);
  const [gallery, setGallery] = useState<string[]>([]);
  const [advertisementId, setAdvertisementId] = useState('');

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

        setAdvertisementId(result.data.createAdvertisement.id);

        setCurrent(1);

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

  const handleGalleryUpdate = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files) {
        const data = new FormData();
        const newGallery = e.target.files;

        let list: string[] = [];

        
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < newGallery.length; i++) {
          list.push(URL.createObjectURL(newGallery[i]));
          data.append('gallery', newGallery[i]); 
        }

        api
          .post(`/advertisements/${advertisementId}/gallery/photo`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            setGallery(list);
            console.log(list);
            addToast({
              type: 'success',
              title: 'Fotos na galeria atualizado!',
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Erro no Upload das imagens',
            });
          });
      }
    },
    [addToast, advertisementId],
  );
  const AdvertisementFormView = (): JSX.Element => (
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
  );

  const AdvertisementGalleryView = (): JSX.Element => (
    <GalleryContainer>
      <UploaderView>
        {/* <Uploader
          name="gallery"
          multiple
          listType="picture-text"
          action="//jsonplaceholder.typicode.com/posts/"
          onChange={(value: FileList) => {
            handleGalleryUpdate(value);
          }}
          draggable
        >
          <DragZone>
            <FiCamera size={32} />
            <p>Clique ou arraste os arquivos para download</p>
          </DragZone>
        </Uploader> */}
        <input type="file" multiple onChange={handleGalleryUpdate} />
        {/* <Carousel
          showThumbs
          dynamicHeight={false}
          width="100%"
          thumbWidth={200}
        >
       {gallery &&
            gallery.map((item) => (
              <img alt="image3" src={item} />
            ))}
        </Carousel> */}
        <Button
          onClick={() => {
            setCurrent(2);
          }}
        >
          Continuar
        </Button>
      </UploaderView>
    </GalleryContainer>
  );

  const ShowSuccess = useCallback(() => {
    return (
      <Success>
        <FiCheckCircle size={240} color="green" />
        <h1>Cadastro do imóvel concluído!! </h1>
        <Button
          onClick={() =>
            router.push(`/advertisement-details/${advertisementId}`)
          }
        >
          Ver Anúncio
        </Button>
      </Success>
    );
  }, [router, advertisementId]);

  const currentStep = useCallback(() => {
    switch (current) {
      case 0:
        return <AdvertisementFormView />;
      case 1:
        return <AdvertisementGalleryView />;
      default:
        return <ShowSuccess />;
    }
  }, [current]);

  return (
    <Container>
      <StepView>
        <Steps current={current}>
          <Steps.Item
            title="Cadastro do imóvel"
            icon={<FiBookOpen size={20} />}
          />
          <Steps.Item
            title="Galeria do imóvel"
            icon={<FiBookOpen size={20} />}
          />
          <Steps.Item title="Finalizado!" icon={<FiCheckCircle size={20} />} />
        </Steps>
      </StepView>
      {currentStep()}
    </Container>
  );
};

export default AdvertisementRegistration;
