import 'react-native-gesture-handler';
import AppProvider from './context';

import React from 'react';
import { View, StatusBar } from 'react-native';
import AuthRoutes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#282A36" />
      <AppProvider>
         <View style={{ flex: 1, backgroundColor: '#282A36' }}>
         <AuthRoutes />
         </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
