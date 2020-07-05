import React from 'react';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from 'react-native';

const Routes: React.FC = () => {
   const {user, loading} = useAuth();

   if(loading) {
      return (
         <View style={{flex:1, justifyContent:'center', alignContent:"center"}}>
            <ActivityIndicator size="large" color="#999"/>
         </View>
      )
   }

   return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;
