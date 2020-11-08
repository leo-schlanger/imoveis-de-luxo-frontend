/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

export const schemaForgotPassword = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
});

export const schemaResetPassword = Yup.object().shape({
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Confirmação incorreta',
  ),
});

export const schemaSignUp = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  phone: Yup.string().required(),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'Confirmação incorreta',
  ),
});

export const schemaEditProfile = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', {
    is: (val) => val.length,
    then: Yup.string().required('Campo obrigatório'),
    otherwise: Yup.string,
  }),
  password_confirmation: Yup.string()
    .when('old_password', {
      is: (val) => val.length,
      then: Yup.string().required('Campo obrigatório'),
      otherwise: Yup.string,
    })
    .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
});

export const schemaCreateAdvertisement = Yup.object().shape({
  title: Yup.string().required('Titulo obrigatório'),
  description: Yup.string(),
  type: Yup.string().required('Tipo de anuncio obrigatório'),
  type_property: Yup.string().required('Titulo de propriedade obrigatório'),
  // address_visible: Yup.boolean().required('Endereço obrigatório'),
  value: Yup.number().required('Valor obrigatório'),
  country: Yup.string().required('Pais obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  postal_code: Yup.string().required('Código postal obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  street: Yup.string().required('Endereço obrigatório'),
  number: Yup.string(),
  complement: Yup.string(),
});

export function isSchemaValidationError(error: any): boolean {
  return error instanceof Yup.ValidationError;
}
