import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import loginBackground from '../../assets/login-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const appearFormLeft = keyframes`
  from {
    opacity:0;
    transform:translateX(-50px)
  }
  to {
    opacity:1;
    transform:translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFormLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }

  form h1 {
    margin-bottom: 24px;
    color: #f4ede8;
  }

  form a {
    color: #f4ede8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  form a svg {
    margin-right: 4px;
  }

  > a {
    color: #ff9100;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9100')};
    }
  }

  > a svg {
    margin-right: 16px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
`;
