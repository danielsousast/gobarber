import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import {
   Container,
   Header,
   HeaderTitle,
   UserName,
   ProfileButton,
   UserAvatar,
   ProvidersList,
   ProviderListTitle,
} from './styles';
import api from '../../services/api';
import ProviderItem from '../../components/ProviderItem';

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

const Dashboard: React.FC = () => {
   const [providers, setProviders] = useState<Provider[]>([]);

   const { user } = useAuth();
   const { navigate } = useNavigation();

   useEffect(() => {
      api.get('providers').then(response => {
         setProviders(response.data);
      });
   }, []);

   const navigateToProfile = useCallback(() => {
      navigate('profile');
   }, [navigate]);

   const navigateToCreateAppointment = useCallback(
      (providerId: string) => {
         navigate('createAppointment', { providerId });
      },
      [navigate],
   );

   return (
      <Container>
         <Header>
            <HeaderTitle>
               Bem vindo, {'\n'}
               <UserName>{user.name}</UserName>
            </HeaderTitle>

            <ProfileButton onPress={navigateToProfile}>
               <UserAvatar
                  source={{
                     uri:
                        user.avatar_url ||
                        'https://avatars2.githubusercontent.com/u/15719314?s=460&u=7bc792a5320c7546f3fc239e4d85ca2e3d7d1e3c&v=4',
                  }}
               />
            </ProfileButton>
         </Header>
         <ProvidersList
            ListHeaderComponent={
               <ProviderListTitle>Cabeleireiros</ProviderListTitle>
            }
            data={providers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
               <ProviderItem
                  provider={item}
                  onPress={() => navigateToCreateAppointment(item.id)}
               />
            )}
         />
      </Container>
   );
};

export default Dashboard;
