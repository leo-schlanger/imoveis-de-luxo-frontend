import styled from 'styled-components';

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

export const Adescription = styled.div`
  width: 80%;
  p {
    margin-top: 2%;
    width: 100%;
    height: 60px;
    font-size:16px;
    color: #c1b994;
  }
`;


export const Carrosel = styled.div`
  width: 80%;
  place-items: center;
 
`;

export const Adinfo = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5%;
  margin-bottom: 5%;
  width: 80%;
  grid-template-columns: repeat(auto-fit, minmax(15px, 1fr));
  p {
    height: 40px;
  }
`;

export const Adseller = styled.div`
  display: grid;
  place-items: center;
  margin-top: 1%;
  margin-bottom: 5%;
  width: 80%;
`;

export const Adlist = styled.div`
  display: grid;
  width: 80%;
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
    color: green;
    margin-bottom: 0px;
  }

  img {
    width: 200px;
    height: 200px;
  }

  li {
    padding: 24px;
    border-radius: 4px;
    position: relative;
    background-color: #c1b994;
  }
`;

export const GridHolder = styled.div`
width:80%;
height:200px;
overflow-x:scroll;
overflow-y:block;

`;

export const GridList = styled(GridListMaterialUI)`
img {
  width: 500px;
  height: 200px;
}
display: flex;
`;

export const GridListTile = styled(GridListTileMaterialUI)`
color: theme.palette.primary.light;
`;

export const GridListTileBar = styled(GridListTileBarMaterialUI)`
background:
        linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
    
`;