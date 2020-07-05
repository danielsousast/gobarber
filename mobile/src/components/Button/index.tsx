import React from 'react';
import { RectButtonProperties } from "react-native-gesture-handler";
import {Container, ButtonTitle} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => (
  <Container {...rest}>
      <ButtonTitle>{children}</ButtonTitle>
  </Container>
);

export default Button;
