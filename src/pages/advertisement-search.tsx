import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import Image from 'next/image';
import { FIND_ADVERTISEMENTS } from '../libs/gql/advertisements';
import { Advertisement } from '../libs/entities/advertisements';

import {
  Container,
  SearchBar,
  Houses,
  AddTable,
  EndBar,
} from '../../styles/pages/Advertisement-Search';
import Button from '../components/Button';

interface IQueryData {
  advertisements: {
    list: Advertisement[];
    total: number;
  };
}

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [per_page] = useState(4);
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
      <SearchBar>
        <p>Tipos :</p>

        <select name="cars" id="cars">
          <option value="volvo">Apartamentos</option>
          <option value="saab">Casas</option>
          <option value="mercedes">Ilhas</option>
          <option value="audi">outros</option>
        </select>
        <p>Finalidade:</p>

        <select name="cars" id="cars">
          <option value="volvo">Venda</option>
          <option value="saab">Locação</option>
        </select>

        <p>Cidade:</p>

        <select name="cars" id="cars">
          <option value="volvo">Rio de janeiro</option>
          <option value="saab">São Paulo</option>
          <option value="mercedes">Miami</option>
          <option value="audi">Londres</option>
        </select>
        <p>Bairro:</p>

        <select name="cars" id="cars">
          <option value="volvo">Baseado na cidade</option>
          <option value="saab">Baseado na cidade</option>
          <option value="mercedes">Baseado na cidade</option>
          <option value="audi">Baseado na cidade</option>
        </select>
        <Button>Buscar</Button>
      </SearchBar>

      <Houses>
        <AddTable>
          {data &&
            data.advertisements.list &&
            data.advertisements.list.map((advertisement) => (
              <li key={advertisement.id}>
                <a href={`advertisement-details/${advertisement.id}`}>
                  <Image
                    src="/assets/casa.svg"
                    alt="house"
                    width={500}
                    height={500}
                  />
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
        </AddTable>
      </Houses>
    </Container>
  );
};

export default Home;
