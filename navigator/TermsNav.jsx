import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TermScreen from '../screens/auth/TermScreen';

const Nav = createNativeStackNavigator();

const TermsNav = ({route}) => <Nav.Navigator
  screenOptions={{
    presentation: "modal",
    // headerTintColor: "white",
    headerShown: false,
    // presentation: 'modal'
  }}
>
  <Nav.Screen name='TermScreen' component={TermScreen} initialParams={{type: route.params?.type, text: route.params?.text}}/>
</Nav.Navigator>

export default TermsNav