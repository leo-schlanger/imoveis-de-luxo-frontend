import { Container,  Houses } from '../../styles/pages/Faq';

import Image from 'next/image';
// import { FiSearch } from 'react-icons/fi';
// import Input from '../../components/Input';

const Faq: React.FC = () => {
  return (
    <Container>
      <Houses>
        <div>
        <Image
                      src="/assets/alert.svg"
                      alt="house"
                      width={500}
                      height={500}
                    />
        <p>Ainda em construção</p>
        </div>
        </Houses>
    </Container>
  );
};

export default Faq;
