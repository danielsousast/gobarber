import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Provider } from './index';

export const Container = styled.View`
   flex: 1;
`;

export const Header = styled.View`
   padding: 24px;
   padding-top: ${getStatusBarHeight() + 24}px;
   background: #1f2028;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
   color: #f4ede8;
   font-size: 24px;
   font-family: 'RobotoSlab-Regular';
   line-height: 28px;
`;

export const UserName = styled.Text`
   color: #ff9000;
   font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
   width: 56px;
   height: 56px;
   border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
   padding: 32px 24px 16px;
`;

export const ProviderListTitle = styled.Text`
   font-size: 24px;
   margin-bottom: 24px;
   color: #f4ede8;
   font-family: 'RobotoSlab-Medium';
`;
