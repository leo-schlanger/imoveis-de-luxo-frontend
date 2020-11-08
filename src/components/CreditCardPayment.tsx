import { useState, useCallback, useRef } from 'react';
import Cards from 'react-credit-cards';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
  CreditCardMethod,
  CardContainer,
  PageContainer,
} from '../../styles/components/CreditCardPayment';
import 'react-credit-cards/es/styles-compiled.css';
import Button from './Button';
import Input from './Input';
import MaskInput from './MaskInput';

export interface CreditCardData {
  cvc: string;
  name: string;
  number: string;
  expiry: string;
}

interface CreditCardPaymentData {
  handleSubmit: (data: CreditCardData) => void;
}

type cardFields = 'number' | 'cvc' | 'expiry' | 'name' | undefined;

const CreditCardPayment: React.FC<CreditCardPaymentData> = ({
  handleSubmit,
}) => {
  const [focus, setFocus] = useState<cardFields>();
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [number, setNumber] = useState('');

  const formRef = useRef<FormHandles>(null);

  const handleFocus = useCallback((value: cardFields) => {
    setFocus(value);
  }, []);

  return (
    <PageContainer>
      <CreditCardMethod id="PaymentForm">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input
              name="name"
              type="text"
              value={name}
              placeholder="Nome do responsável"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus('name')}
            />
          </div>
          <div>
            <Input
              name="number"
              value={number}
              type="tel"
              placeholder="Número"
              maxLength={16}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              onFocus={() => handleFocus('number')}
            />
          </div>
          <div>
            <MaskInput
              mask="99/99"
              name="expiry"
              value={expiry}
              type="tel"
              placeholder="Data de expiração"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={() => handleFocus('expiry')}
            />
            <Input
              name="cvc"
              value={cvc}
              placeholder="CVC"
              type="tel"
              maxLength={3}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={() => handleFocus('cvc')}
            />
          </div>

          <Button type="submit">Efetuar Pagamento</Button>
        </Form>
        <CardContainer>
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </CardContainer>
      </CreditCardMethod>
      <Button type="submit">Boleto</Button>
    </PageContainer>
  );
};

export default CreditCardPayment;
