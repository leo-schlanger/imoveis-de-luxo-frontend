import styled from 'styled-components';
import { shade } from 'polished';
import colors from '../../styles/colors';

export const Container = styled.button`
  background: ${colors.button_color};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: ${colors.button_text_color};
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.5, colors.button_color)};
  }
`;
