import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import colors from '../../styles/colors';

const appearFromTop = keyframes`
  from{
    opacity: 0;
    transform: translatey(-50%);
  },
  to{
    opacity: 1;
    transform: translatey(0);
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;

  animation: ${appearFromTop} 1s;
`;
export const Principal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 128px;

  form {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    > div {
      height: 36px;
    }
  }
`;

export const FooterForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 8px;
  align-items: center;
  button {
    width: 100px;
    height: 24px;
  }

  > a {
    color: ${colors.text_color};
    margin-top: 20px;
    margin-right: 16px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, colors.text_color)};
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  flex: 1;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 16px;
    line-height: 24px;

    span {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-size: 18px;

      &:hover {
        opacity: 0.8;
      }
    }

    button {
      display: flex;
      align-items: flex-start;
      margin-top: 8px;
      background: transparent;
      border: 0;

      svg {
        color: ${colors.text_color};
        width: 16px;
        height: 16px;
      }

      svg:hover {
        color: ${colors.error_color};
      }
    }
  }
`;

export const Navbar = styled.p`
  display: flex;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.navbar_color};
  height: 48px;
  width: 100%;

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
`;
