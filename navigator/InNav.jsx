import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyDrawer } from './Drawer';
import Profile from '../screens/auth/Profile';

const Nav = createNativeStackNavigator();

const InNav = () => <Nav.Navigator
screenOptions={{
  // presentation: "modal",
    headerTintColor: "white",
  headerShown: false
}}
>
  <Nav.Screen name='Drawer' component={MyDrawer} />
  {/* <Nav.Screen name="Profile" component={Profile} /> */}
</Nav.Navigator>

export default InNav