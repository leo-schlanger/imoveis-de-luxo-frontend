import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 64px;
  font-size: 16px;

  input {
    margin-top: 10px;
  }
  form {
    margin-top: 10px;
  }

  textarea {
    padding: 10px;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
  }
`;
