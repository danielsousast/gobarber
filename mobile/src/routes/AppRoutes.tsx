import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#282A36' },
    }}
  >
    <App.Screen name="dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
