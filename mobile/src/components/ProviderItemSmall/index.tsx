import React from 'react';
import { Container, ProviderAvatar, ProviderName } from './styles';

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

interface ProviderItemProps {
   provider: Provider;
   selected: boolean;
   onPress(): void;
}

const ProviderItemSmall: React.FC<ProviderItemProps> = ({
   provider,
   selected,
   onPress,
}) => {
   return (
      <Container selected={selected} onPress={onPress}>
         <ProviderAvatar
            source={{
               uri:
                  provider.avatar_url ||
                  'https://avatars2.githubusercontent.com/u/15719314?s=460&u=7bc792a5320c7546f3fc239e4d85ca2e3d7d1e3c&v=4',
            }}
         />
         <ProviderName selected={selected}>{provider.name}</ProviderName>
      </Container>
   );
};

export default ProviderItemSmall;
