import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9100;
  color: #312e38;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  margin-top: 16px;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9100')};
  }
`;
