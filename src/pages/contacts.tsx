/* eslint-disable @typescript-eslint/no-empty-function */
import { useRef } from 'react';
import { Form } from '@unform/web';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Container } from '../../styles/pages/Contacts';
import Input from '../components/Input';
import Button from '../components/Button';

const Terms: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <h1>Contatos</h1>
      <p>
        Envie seus pedidos, dúvidas ou sugestões, através do formulário abaixo
        ou por telefone.
      </p>

      <Form ref={formRef} onSubmit={() => {}}>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input name="phone" icon={FiPhone} placeholder="Telefone" />
        <textarea name="message" placeholder="Mensagem" />
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
};

export default Terms;
