/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from '../../styles/components/TextArea';

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  containerStyle?: object;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  containerStyle,
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, _setIsFocused] = useState(false);
  const [isFilled, _setIsFilled] = useState(false);
  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="textArea-container"
    >
      <textarea
        rows={5}
        defaultValue={defaultValue}
        ref={textAreaRef}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
