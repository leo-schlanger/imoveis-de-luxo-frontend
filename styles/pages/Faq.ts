import styled from 'styled-components';
// import { shade } from 'polished';
// import colors from '../../styles/colors';

interface AdvertsimentProps {
  background_url: string;
}

export const Advertsiment = styled.div<AdvertsimentProps>`
  display: flex;
  flex: 1;
  background: url(${(props) => props.background_url});
`;

export const Container = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  padding: 20px 0px;
  margin-top: 1%;
  margin-left:40%;
  img {
    height: 300px;
    margin-left:40%;
  }
  p {
    width: 10%;
    margin-left:10%;
    margin-top: 5%;
    font-size: 20px;
  }
`;
export const Houses = styled.div`
  align-items: center;
  justify-content: center;
`;
