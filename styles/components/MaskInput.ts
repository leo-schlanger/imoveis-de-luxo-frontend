import styled, { css } from 'styled-components';
import Tooltip from '../../src/components/Tooltip';
import colors from '../../styles/colors';


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${colors.input_color};
  border-radius: 4px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${colors.input_border_color};
  color: ${colors.input_icon_color};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${colors.error_color};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid ${colors.input_border_color_onfocus};
      color: ${colors.input_border_color_onfocus};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${colors.input_border_color_onfocus};
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: ${colors.input_text_color};

    &::placeholder {
      color: ${colors.input_placeholder_color};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: ${colors.span_error_color};
    color: #fff;

    &::before {
      border-color: ${colors.error_color} transparent;
    }
  }
`;
