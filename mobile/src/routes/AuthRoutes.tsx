import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#282A36' },
    }}
  >
    <Auth.Screen name="login" component={Login} />
    <Auth.Screen name="register" component={Register} />
  </Auth.Navigator>
);

export default AuthRoutes;
