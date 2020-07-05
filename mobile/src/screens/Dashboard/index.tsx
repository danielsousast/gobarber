import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
   const {user} = useAuth()

   console.log(user)

   return <View />;
}

export default Dashboard;
