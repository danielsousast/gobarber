import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   align-items: center;
   padding: 0 24px;
`;

export const Title = styled.Text`
   color: #f4ede8;
   font-family: 'RobotoSlab-Medium';
   font-size: 32px;
   margin-top: 32px;
   text-align: center;
`;

export const Description = styled.Text`
   margin-top: 18px;
   font-size: 16px;
   color: #999591;
   font-family: 'RobotoSlab-Regular';
`;

export const OkButton = styled(RectButton)`
   height: 50px;
   background: #ff9000;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   margin: 0 24px 24px;
   padding: 12px 24px;
   margin-top: 20px;
`;

export const OkButtonText = styled.Text`
   font-family: 'RobotoSlab-Medium';
   font-size: 18px;
   color: #232129;
`;
