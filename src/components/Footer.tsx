import Link from 'next/link';

import { Container, Line, Base, FooterForm } from '../../styles/components/Footer';

const Footer: React.FC = () => {
  return (
    <>
      <Container>
        <Line />
        <FooterForm>
          <a href="/">Navegação</a>
          <a href="https://www.facebook.com/imoveisdeluxo.com.br">Facebook</a>
          <a href="/">Informações</a>
          <Link href="/terms">Termos de uso</Link>
        </FooterForm>
        <Line />
        <Base>
          <img src={'/assets/logo2.png'} alt="imoveis de luxo" />
          <p>&copy; 2007 - Imóveis de Luxo - Todos os direitos reservados</p>
        </Base>
      </Container>
    </>
  );
};

export default Footer;
