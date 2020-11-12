import styled from 'styled-components';
// import { shade } from 'polished';
// import colors from '../../styles/colors';
import { Checkbox as CheckboxMaterialUI } from '@material-ui/core';

import colors from '../colors';

interface AdvertsimentProps {
  background_url: string;
}

export const Advertsiment = styled.div<AdvertsimentProps>`
  display: flex;
  flex: 1;
  background: url(${(props) => props.background_url});
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  margin-bottom: 20%;
  height: 1200px;
  img {
    width: 100%;
    height: 300px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #c1b994;
  margin-top: 5px;
  label {
    margin-left: 2%;
    margin-top: 1%;
  }
  select {
    height: 20px;
    margin-left: 1%;
    margin-top: 2%;
  }
  button {
    background-color: #c1b994;
    padding: 8px;
    margin-left: 5%;
  }
`;

export const Filters = styled.div`
  display: flex;
  place-items: center;
  width: 100%;
  height: 50px;
  background-color: #c1b994;

  label {
    margin-top: 1%;
  }
  select {
    height: 20px;
    margin-left: 1%;
    margin-top: 2%;
  }
`;

export const Checkbox = styled(CheckboxMaterialUI)`
  padding: 4px;
`;

export const Navbar = styled.div`
  display: flex;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  background-color: #c1b994;
  height: 48px;
  width: 100%;

  p {
    margin-top: 8px;
    color: black;
    display: flex;
    align-items: center;
    font-weight: 500;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
    }

    a + a::before {
      content: '';
      width: 1px;
      height: 12px;
      background: black;
      margin: 0 8px;
    }
  }
`;

export const Houses = styled.div`
  display: flex;
  flex: 1;
  place-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Open sans';
`;

export const AddTable = styled.ul`
  margin-top: 10px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
  list-style: none;

  ul li {
    width: 200px;
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    position: relative;
  }
  p{
    color: #c1b994;
  }
  h6 {
    color: #c1b994 ;
    margin-bottom: 0px;
  }

  img {
    width: 230px;
    height: 180px;
    float: right;
    margin-left: 10px;
    margin-top: 10px;
  }

  li {  border: 2px solid ${colors.input_color};
    padding: 24px;
    position: relative;
    width: 600px;
  }

  }
  hr {
    color: #c1b994;
    background-color: #c1b994;
    height: 2px;

  }
`;
export const EndBar = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Open sans';

  button {
    margin-left: 12%;
    color: #c1b994;
    border-radius: 4px;
    padding: 12px;
  }

  button + button {
    margin-left: 60%;
    border-radius: 4px;
    color: #c1b994;
    padding: 12px;
  }
`;
