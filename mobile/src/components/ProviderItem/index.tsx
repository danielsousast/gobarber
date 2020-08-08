import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from '../../screens/Dashboard';
import {
   Container,
   ProviderAvatar,
   ProviderInfo,
   ProviderName,
   ProviderMeta,
   ProviderMetaText,
} from './styles';

interface ProviderItemProps {
   onPress(): void;
   provider: Provider;
}

const ProviderItem: React.FC<ProviderItemProps> = ({ onPress, provider }) => {
   return (
      <Container onPress={onPress}>
         <ProviderAvatar
            source={{
               uri:
                  provider.avatar_url ||
                  'https://avatars2.githubusercontent.com/u/15719314?s=460&u=7bc792a5320c7546f3fc239e4d85ca2e3d7d1e3c&v=4',
            }}
         />
         <ProviderInfo>
            <ProviderName>{provider.name}</ProviderName>
            <ProviderMeta>
               <Icon name="calendar" size={14} color="#ff9000" />
               <ProviderMetaText>Segunda à sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
               <Icon name="clock" size={14} color="#ff9000" />
               <ProviderMetaText>08:00 as 18:00</ProviderMetaText>
            </ProviderMeta>
         </ProviderInfo>
      </Container>
   );
};

export default ProviderItem;
