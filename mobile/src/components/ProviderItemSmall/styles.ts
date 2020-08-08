import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
   selected: boolean;
}

interface ProviderNameProps {
   selected: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
   background: ${props => (props.selected ? '#ff9000' : '#2e3144')};
   flex-direction: row;
   align-items: center;
   padding: 8px 12px;
   margin-right: 16px;
   border-radius: 10px;
`;

export const ProviderAvatar = styled.Image`
   width: 32px;
   height: 32px;
   border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
   font-family: 'RobotoSlab-Medium';
   font-size: 16px;
   color: ${props => (props.selected ? '#232129' : '#f4ede8')};
   margin-left: 10px;
`;
