import styled from 'styled-components';
// import { shade } from 'polished';
import colors from '../colors';
import GridListMaterialUI from '@material-ui/core/GridList';
import GridListTileMaterialUI from '@material-ui/core/GridListTile';
import GridListTileBarMaterialUI from '@material-ui/core/GridListTileBar';



interface AdvertisementProps {
  background_url: string;
}

export const Advertisement = styled.div<AdvertisementProps>`
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

export const DivisionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.navbar_color};
  font-size: 18px;
  width: 100%;
  color: black;
  font-weight: 500;
  padding: 18px;

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
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #c1b994;
  margin-top: 1px;
  input {
    align-self: center;
    margin-left: 40%;
    margin-top: 1%;
  }
  button {
    margin-bottom: 5%;
    margin-left: 20%;
  }
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
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Open sans';
  margin-top: 10px;
`;


export const AddTable = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  list-style: none;
  ul li {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    position: relative;
  }
  h6 {
    color: #c1b994;
    margin-bottom: 0px;
  }

  img {
    width: 200px;
    height: 200px;
  }

  li {
    border: 2px solid ${colors.input_color};
    padding: 24px;
    border-radius: 4px;
    position: relative;
  }
  hr {
    color: #c1b994;
    background-color: #c1b994;
    height: 2px;
  }
  p {
    color: #c1b994;
  }
`;

export const EndBar = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Open sans';

  button {
    margin-left: 20%;
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


export const GridHolder = styled.div`
width:100%;
`;

export const GridList = styled(GridListMaterialUI)`
width:100%;
flex-direction: row;

`;

export const GridListTile = styled(GridListTileMaterialUI)`
color: theme.palette.primary.light;
flex-direction: row;

`;

export const GridListTileBar = styled(GridListTileBarMaterialUI)`
background:
        linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);

`;
