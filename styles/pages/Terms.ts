import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 64px;
  font-size: 16px;
`;

export const TermsContainer = styled.div`
  padding: 32px;
  margin-top: 48px;
  border: 2px solid ${colors.frame_color};

  p {
    margin: 8px;
  }

  ul {
    padding: 64px;
    margin-top: 16px;
    list-style-type: upper-roman;

    li {
      font-weight: bold;
    }
  }
`;
