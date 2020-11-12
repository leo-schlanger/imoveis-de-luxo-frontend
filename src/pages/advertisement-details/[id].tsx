import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import { FiHome } from 'react-icons/fi';

import { useQuery } from '@apollo/react-hooks';
import { FaBed, FaParking, FaShower } from 'react-icons/fa';
import { IoIosCube } from 'react-icons/io';
import Image from 'next/image';
import {
  Container,
  Adescription,
  Adinfo,
  Adseller,
  GridList,
  GridListTile,
  GridListTileBar,
  GridHolder,
} from '../../../styles/pages/AdvertisementsDetails';

import { Advertisement } from '../../libs/entities/advertisements';
import { FIND_ADVERTISEMENT_BY_ID } from '../../libs/gql/advertisements';
// import SEO from '../../components/SEO';

interface IQueryData {
  getAdvertisementById: Advertisement;
}

const AdvertisementDetails: React.FC = () => {
  const [advertisement, setAdvertisement] = useState<
    Advertisement | undefined
  >();
  const { query } = useRouter();

  const { data, error } = useQuery<IQueryData>(FIND_ADVERTISEMENT_BY_ID, {
    variables: { id: parseInt(String(query.id), 10) },
  });

  useEffect(() => {
    setAdvertisement(data?.getAdvertisementById);
    console.log(error);
  }, [data, error]);

  return (
    <>
      {/* <SEO title={data.getAdvertisementById.title} /> */}
      <Container>
        <GridHolder>
          <GridList >
            <GridListTile>
              <img src="/assets/casa.svg" alt="house" />
            </GridListTile>
            <GridListTile>
              <img src="/assets/casa.svg" alt="house" />
            </GridListTile>
            <GridListTile>
              <img src="/assets/casa.svg" alt="house" />
            </GridListTile>
            <GridListTile>
              <img src="/assets/casa.svg" alt="house" />
            </GridListTile>
           
          </GridList>
        </GridHolder>
        {/* <Carousel
          showThumbs
          dynamicHeight={false}
          width="100%"
          thumbWidth={200}
        >
          {advertisement &&
            advertisement.gallery.map((item) => (
              <img alt="image3" src={item.url} />
            ))}
        </Carousel> */}
        <Adinfo>
          {/* {advertisements.map(advertisement =>
            <li>
            <h6>{advertisement.title}</h6>
            <img src={advertisement.gallery[0].filename} alt="house" />
            <p>{advertisement.property.value}</p>

          </li>
            )} */}
          <FaBed size="2rem" color="#c1b994" />
          <p>infos</p>
          <FaParking size="2rem" color="#c1b994" />
          <p>infos</p>
          <FaShower size="2rem" color="#c1b994" />
          <p>infos</p>
          <IoIosCube size="2rem" color="#c1b994" />
          <p>infos</p>
        </Adinfo>
        <Adseller>
          <FiHome size="2rem" color="#c1b994" />
          <p>infos</p>
        </Adseller>
        <Adescription>
          <hr />
          <p>
            Endereço:
            <br />
            {advertisement &&
              `${advertisement.property.address.country} ${advertisement.property.address.state} ${advertisement.property.address.neighborhood} ${advertisement.property.address.number}`}
          </p>
          <hr />
          <p>
            Descrição:
            <br />
            {advertisement && advertisement.description}
            <hr />
          </p>
        </Adescription>
      </Container>
    </>
  );
};

export default AdvertisementDetails;
