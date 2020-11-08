import styled, { keyframes } from 'styled-components';

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

export const PageContainer = styled.div`

`;

export const CreditCardMethod = styled.div`
  display: flex;
  flex: 1;
  width: 60%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 120px;
  
  

  animation: ${appearFromRight} 1s;

  form {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-right: 102px;

    div {
      display: flex;
      flex: 1;
      flex-direction: row;
      margin: 4px;
    }

    button {
      height: 32px;
      width: 40%;
      margin-left: 8px;
    }
  }
`;

export const CardContainer = styled.div`
  align-self: center;
`;
