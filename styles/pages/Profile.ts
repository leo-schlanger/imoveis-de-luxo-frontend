import styled from 'styled-components';
import { shade } from 'polished';
import colors from '../colors';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px 0 auto;

  place-content: center;

  form {
    margin: 80px 0;
    width: 340;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const AddTable = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
