import styled, { keyframes } from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 64px;
`;

export const StepView = styled.div`
  width: 100%;
  margin-top: 48px;
  padding: 0px 10%;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translatex(-50%);
  },
  to{
    opacity: 1;
    transform: translatex(0);
  }
`;

export const AdvertisementForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4%;
  flex-direction: column;
  background-color: ${colors.background};
  width: 80%;
  margin-bottom: 10%;

  animation: ${appearFromLeft} 1s;
  form {
    width: 100%;

    > div {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }

    button {
      margin-top: 80px;
    }
  }
`;

export const Base = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: center;
`;

export const Address = styled.div`
  display: flex;
  width: 45%;
  flex-direction: column;
  justify-content: center;
`;

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translatex(50%);
  },
  to{
    opacity: 1;
    transform: translatex(0);
  }
`;

export const GalleryContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1s;
`;

export const UploaderView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 8px;
  padding-bottom: 16px;
`;


export const DragZone = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

export const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 64px;
  animation: ${appearFromRight} 1s;

  h1 {
    margin-bottom: 16px;
  }
`;
