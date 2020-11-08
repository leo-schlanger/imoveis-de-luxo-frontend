import styled from 'styled-components';

export const Container = styled.div`
  background-color: #11120b;
  margin-top: 300px;
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d4d1a7;
  margin-top: 15px;
`;

export const Base = styled.div`
  margin: 20px 0;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;

  p {
    margin: 36px 0;
    font-size: 16px;
  }
`;

export const FooterForm = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  color: white;
  align-items: center;
  font-weight: 500;
  width: 100%;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    text-align: center;
  }

  a + a::before {
    content: '';
    width: 1px;
    height: 24px;
    background: black;
    margin: 0px 64px;
  }
`;

export const Navbar = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c1b994;
  height: 5px;
  width: 100%;
`;
