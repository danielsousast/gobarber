import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import {
   Container,
   Header,
   HeaderTitle,
   BackButton,
   UserAvatar,
   ProvidersListContainer,
   ProvidersList,
   Calendar,
   CalendarTitle,
   OpenDatePikerButton,
   OpenDatePikerButtonText,
   Section,
   SectionContent,
   SectionTitle,
   Hour,
   HourText,
   Schedule,
   Content,
   CreateButton,
   CreateButtonText,
} from './styles';
import api from '../../services/api';
import ProviderItemSmall from '../../components/ProviderItemSmall';
import { Platform, Alert } from 'react-native';

interface RouteParams {
   providerId: string;
}

export interface Provider {
   id: string;
   name: string;
   avatar_url: string;
}

interface AvailabilityItem {
   hour: number;
   available: boolean;
}

const CreateAppointment: React.FC = () => {
   const { goBack, navigate } = useNavigation();
   const route = useRoute();
   const routeParams = route.params as RouteParams;
   const { user } = useAuth();

   const [providers, setProviders] = useState<Provider[]>([]);
   const [selectedProvider, setSelectedPovider] = useState(
      routeParams.providerId,
   );
   const [showDatePicker, setShowDatePiker] = useState(false);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [selectedHour, setSelectedHour] = useState(0);

   const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

   useEffect(() => {
      api.get('providers').then(response => {
         setProviders(response.data);
      });
   }, []);

   useEffect(() => {
      api.get(`providers/${selectedProvider}/day-availability`, {
         params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
         },
      }).then(response => {
         setAvailability(response.data);
      });
   }, [selectedDate, selectedProvider]);

   const navigateToBack = useCallback(() => {
      goBack();
   }, [goBack]);

   const handleSelectProvider = useCallback((providerId: string) => {
      setSelectedPovider(providerId);
   }, []);

   const handleToggleDatePiker = useCallback(() => {
      setShowDatePiker(prevState => !prevState);
   }, []);

   const handleDateChange = useCallback(
      (event: any, date: Date | undefined) => {
         if (Platform.OS === 'android') {
            setShowDatePiker(false);
         }

         if (date) {
            setSelectedDate(date);
         }
      },
      [],
   );

   const handleSelectHour = useCallback((hour: number) => {
      setSelectedHour(hour);
   }, []);

   const handleCreateAppointment = useCallback(async () => {
      try {
         const date = new Date(selectedDate);

         date.setHours(selectedHour);
         date.setMinutes(0);

         await api.post('appointments', {
            provider_id: selectedProvider,
            date,
         });

         navigate('appoitmentCreated', { date: date.getTime() });
      } catch (err) {
         Alert.alert(
            'Erro ao criar agendamento',
            'Ocorreu um erro, tente novamente',
         );
      }
   }, [navigate, selectedDate, selectedHour, selectedHour]);

   const morningAvailability = useMemo(() => {
      return availability
         .filter(({ hour }) => hour < 12)
         .map(({ hour, available }) => {
            return {
               hour,
               available,
               hourFormatted: format(new Date().setHours(hour), 'HH:00'),
            };
         });
   }, [availability]);

   const afternoonAvailability = useMemo(() => {
      return availability
         .filter(({ hour }) => hour >= 12)
         .map(({ hour, available }) => {
            return {
               hour,
               available,
               hourFormatted: format(new Date().setHours(hour), 'HH:00'),
            };
         });
   }, [availability]);

   return (
      <Container>
         <Header>
            <BackButton onPress={navigateToBack}>
               <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <HeaderTitle>Cabeleireiros</HeaderTitle>
            <UserAvatar
               source={{
                  uri:
                     user.avatar_url ||
                     'https://avatars2.githubusercontent.com/u/15719314?s=460&u=7bc792a5320c7546f3fc239e4d85ca2e3d7d1e3c&v=4',
               }}
            />
         </Header>
         <Content>
            <ProvidersListContainer>
               <ProvidersList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={providers}
                  renderItem={({ item }) => (
                     <ProviderItemSmall
                        provider={item}
                        selected={item.id === selectedProvider}
                        onPress={() => handleSelectProvider(item.id)}
                     />
                  )}
               />
            </ProvidersListContainer>
            <Calendar>
               <CalendarTitle>Escolha a data</CalendarTitle>

               <OpenDatePikerButton onPress={handleToggleDatePiker}>
                  <OpenDatePikerButtonText>
                     Selecionar outra data
                  </OpenDatePikerButtonText>
               </OpenDatePikerButton>

               {showDatePicker && (
                  <DateTimePicker
                     mode="date"
                     display="calendar"
                     textColor="#f4ede8"
                     value={selectedDate}
                     onChange={handleDateChange}
                  />
               )}
            </Calendar>
            <Schedule>
               <CalendarTitle>Escolha o horário</CalendarTitle>

               <Section>
                  <SectionTitle>Manhã</SectionTitle>

                  <SectionContent
                     horizontal
                     showsHorizontalScrollIndicator={false}
                  >
                     {morningAvailability.map(
                        ({ hourFormatted, available, hour }) => (
                           <Hour
                              key={hour}
                              enabled={available}
                              selected={selectedHour === hour}
                              available={available}
                              onPress={() => handleSelectHour(hour)}
                           >
                              <HourText selected={selectedHour === hour}>
                                 {hourFormatted}
                              </HourText>
                           </Hour>
                        ),
                     )}
                  </SectionContent>
               </Section>

               <Section>
                  <SectionTitle>Tarde</SectionTitle>

                  <SectionContent
                     horizontal
                     showsHorizontalScrollIndicator={false}
                  >
                     {afternoonAvailability.map(
                        ({ hourFormatted, available, hour }) => (
                           <Hour
                              key={hour}
                              enabled={available}
                              selected={selectedHour === hour}
                              available={available}
                              onPress={() => handleSelectHour(hour)}
                           >
                              <HourText selected={selectedHour === hour}>
                                 {hourFormatted}
                              </HourText>
                           </Hour>
                        ),
                     )}
                  </SectionContent>
               </Section>
            </Schedule>
            <CreateButton onPress={handleCreateAppointment}>
               <CreateButtonText>Agendar</CreateButtonText>
            </CreateButton>
         </Content>
      </Container>
   );
};

export default CreateAppointment;
