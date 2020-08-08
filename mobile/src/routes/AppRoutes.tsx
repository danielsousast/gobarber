import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import CreateAppointment from '../screens/CreateAppointment';
import AppointmentCreated from '../screens/AppointmentCreated';
import Profile from '../screens/Profile';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
   <App.Navigator
      screenOptions={{
         headerShown: false,
         cardStyle: { backgroundColor: '#282A36' },
      }}
   >
      <App.Screen name="dashboard" component={Dashboard} />
      <App.Screen name="createAppointment" component={CreateAppointment} />
      <App.Screen name="appoitmentCreated" component={AppointmentCreated} />

      <App.Screen name="profile" component={Profile} />
   </App.Navigator>
);

export default AppRoutes;
