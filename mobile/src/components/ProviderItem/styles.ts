import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
   background: #2e3144;
   border-radius: 10px;
   padding: 20px;
   margin-bottom: 16px;
   flex-direction: row;
   align-items: center;
`;

export const ProviderAvatar = styled.Image`
   width: 72px;
   height: 72px;
   border-radius: 36px;
`;

export const ProviderInfo = styled.View`
   flex: 1;
   margin-left: 20px;
`;

export const ProviderName = styled.Text`
   font-family: 'RobotoSlab-Medium';
   font-size: 18px;
   color: #f4ede8;
`;

export const ProviderMeta = styled.View`
   flex-direction: row;
   align-items: center;
   margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
   margin-left: 8px;
   color: #999591;
   font-family: 'RobotoSlab-Regular';
`;
