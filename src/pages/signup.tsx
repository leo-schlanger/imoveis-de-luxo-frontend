import { useRef, useCallback, useState, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiCoffee,
  FiBookOpen,
  FiCreditCard,
  FiCheckCircle,
  FiArrowLeft,
} from 'react-icons/fi';
import { useRouter } from 'next/router';

import {
  Container,
  StepForm,
  // StepView,
  PlansTable,
  PlanContainer,
  Plan,
  PlanPrice,
  PaymentMethodContainer,
  PlanSelectedInfo,
  Success,
  Timeline,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
  TimelineItem,
} from '../../styles/pages/SignUp';

import api from '../libs/api';

import getValidationErrors from '../utils/getValidationErrors';

import { useToast } from '../hooks/toast';

import Button from '../components/Button';
import Input from '../components/Input';
// import CreditCardPayment, {
//   CreditCardData,
// } from '../components/CreditCardPayment';
import { useAuth } from '../hooks/auth';
import { usePlans, Plan as IPlan } from '../hooks/plans';
import { schemaSignUp, isSchemaValidationError } from '../utils/schemas';
import Terms from './terms';
import SEO from '../components/SEO';

interface SignUpFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<IPlan>();

  const formRef = useRef<FormHandles>(null);

  const { user, signIn, updateUser } = useAuth();
  const { plans } = usePlans();
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) setCurrent(0);
    else if (!user.plan) setCurrent(1);
    else if (selectedPlan) setCurrent(2);
    else setCurrent(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        await schemaSignUp.validate(data, { abortEarly: false });

        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          type: 'advertiser',
        });

        signIn({ email: data.email, password: data.password });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
        });

        setCurrent(1);
      } catch (err) {
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
    [addToast, signIn],
  );

  const FormSignUp = useCallback(() => {
    return (
      <StepForm>
        <Form ref={formRef} onSubmit={handleSubmitSignUp}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="phone" icon={FiPhone} placeholder="Telefone" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </StepForm>
    );
  }, [handleSubmitSignUp]);

  const Plans = useCallback(() => {
    const handleSubmitPlan = (plan: IPlan): void => {
      setSelectedPlan(plan);
      setCurrent(2);
    };

    return (
      <PlansTable>
        <PlanContainer>
          {plans &&
            plans.map((plan) => {
              return (
                <Plan key={plan.id}>
                  <h3>{plan.name}</h3>
                  <PlanPrice>
                    <span className="pricing__currency">R$</span>
                    {plan.value}
                    <span className="pricing__period">/ano</span>
                  </PlanPrice>
                  {plan.description && <p>{plan.description}</p>}
                  <ul>
                    <li>Número de anúncios: {plan.quantity_properties}</li>
                    <li>Número de fotos: {plan.quantity_photos}</li>
                    <li>Número de vídeos: {plan.quantity_videos}</li>
                  </ul>
                  <button type="submit" onClick={() => handleSubmitPlan(plan)}>
                    Escolher Plano
                  </button>
                </Plan>
              );
            })}
        </PlanContainer>
      </PlansTable>
    );
  }, [plans]);

  const PaymentMethod = useCallback(() => {
    const handlePaymentCreditCard = async (): // data: CreditCardData,
    Promise<void> => {
      try {
        // eslint-disable-next-line no-console
        // console.log(data);
        const response = await api.put(`users/plan/${selectedPlan?.id}`);
        setCurrent(3);
        updateUser(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    };
    return (
      <PaymentMethodContainer>
        <button
          type="button"
          onClick={() => {
            setCurrent((state) => state - 1);
          }}
        >
          <FiArrowLeft /> Escolher outro plano
        </button>
        <PlanSelectedInfo>
          <p>{selectedPlan?.name}</p>
          <p>{selectedPlan?.value}</p>
        </PlanSelectedInfo>
        {/* <CreditCardPayment handleSubmit={handlePaymentCreditCard} /> */}
        <Button onClick={handlePaymentCreditCard}>Confirmar</Button>
      </PaymentMethodContainer>
    );
  }, [selectedPlan, updateUser]);

  const ShowSuccess = useCallback(() => {
    return (
      <Success>
        <Terms />
        <Button onClick={() => router.push('/advertisement-registration')}>
          Ok Aceito
        </Button>
      </Success>
    );
  }, [router]);

  const currentStep = useCallback(() => {
    switch (current) {
      case 0:
        return <FormSignUp />;
      case 1:
        return <Plans />;
      case 2:
        return <PaymentMethod />;
      default:
        return <ShowSuccess />;
    }
  }, [current, FormSignUp, Plans, PaymentMethod, ShowSuccess]);

  return (
    <>
      <SEO title="Cadastrar-se" />
      <Container>
        {/* <StepView> */}
        <Timeline align="right">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FiCoffee size={20} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Faça seu cadastro</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FiBookOpen size={20} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Escolha seu plano</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FiCreditCard size={20} />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Realizar pagamento</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FiCheckCircle size={20} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>Termos de uso</TimelineContent>
          </TimelineItem>
        </Timeline>
        {/* </StepView> */}
        {currentStep()}
      </Container>
    </>
  );
};

export default SignUp;
