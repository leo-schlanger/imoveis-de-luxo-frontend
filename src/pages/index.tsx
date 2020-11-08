/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react';
//import Link from 'next/link';
import Image from 'next/image';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { useQuery } from '@apollo/react-hooks';

import { Form } from '@unform/web';

import {
  DivisionBar,
  Container,
  SearchBar,
  Houses,
  AddTable,
  EndBar,
} from '../../styles/pages/Home';
import Select from '../components/Select';
import { FIND_ADVERTISEMENTS } from '../libs/gql/advertisements';
import { Advertisement } from '../libs/entities/advertisements';

interface IQueryData {
  advertisements: {
    list: Advertisement[];
    total: number;
  };
}

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page] = useState(8);

  const { data, loading, error } = useQuery<IQueryData>(FIND_ADVERTISEMENTS, {
    variables: {
      per_page,
      page,
    },
  });

  if (loading) {
    return <h1>Carregando anúncios...</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>Ocorreu um erro ao carregar lista de anúncios</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <Container>
      {/* <Carousel showThumbs={false} infiniteLoop autoPlay>
        <div>
          <Image src="/assets/casa.svg" alt="house" width={500} height={500} />
          <p>Casa da barra</p>
        </div>
        <div>
          <Image src="/assets/casa.svg" alt="house" width={500} height={500} />
          <p>Casa da lagoa</p>
        </div>
        <div>
          <Image src="/assets/casa.svg" alt="house" width={500} height={500} />
          <p>Casa Paris</p>
        </div>
      </Carousel> */}
      <SearchBar />

      <DivisionBar>
        <a href="/">Rio de Janeiro</a>
        <a href="/">São paulo</a>
        <a href="/">Belo Horizonte</a>
        <a href="/">Miami</a>
      </DivisionBar>
      <Form onSubmit={() => {}}>
        <Select
          name="type"
          options={[
            { value: 'house', label: 'Casa' },
            { value: 'hotel', label: 'Hotel' },
            { value: 'farm', label: 'Fazenda' },
          ]}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: 'white',
              marginTop: 20,
              width: 300,
            }),
          }}
        />
      </Form>
      <Houses>
        <AddTable>
          {data && data.advertisements.list &&
            data.advertisements.list.map((advertisement) => (
              <li key={advertisement.id}>
                <a href={`advertisement-details/${advertisement.id}`}>
                  <Image src="/assets/casa.svg" alt="house" width={500} height={500} />
                  <h6>{advertisement.title}</h6>
                  <hr />
                  <p>Venda</p>
                  <h6>Rio de janeiro</h6>
                  <p>{advertisement.property.value}</p>
                  <h6>Preço</h6>
                  <hr />
                </a>
              </li>
            ))}
        </AddTable>
      </Houses>
      <EndBar>
        <button
          disabled={page === 1}
          type="button"
          onClick={() => setPage((status) => status - 1)}
        >
          <BiArrowToLeft size={30} />
        </button>
        {/* <div>{data && <p>{data.advertisements.total}</p>}</div> */}
        <button
          disabled={!data || page >= data.advertisements.total / per_page}
          type="button"
          onClick={() => setPage((status) => status + 1)}
        >
          <BiArrowToRight size={30} />
        </button>
      </EndBar>
    </Container>
  );
};

export default Home;
