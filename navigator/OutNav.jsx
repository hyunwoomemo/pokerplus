import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Join from '../screens/Join';
import { MyDrawer } from './Drawer';
import Terms from '../screens/auth/Terms';
import TermsNav from './TermsNav';
import InNav from './InNav';

const Nav = createNativeStackNavigator();

const OutNav = ({route}) => {
  console.log(route.params?.type)
  return (
    <Nav.Navigator
    screenOptions={{
      // presentation: "modal",
      headerTintColor: "white",
      headerShown: false
    }}
    >
    <Nav.Screen name='Login' component={Login} />
    <Nav.Screen name='Terms' component={Terms} />
    <Nav.Screen name='InNav' component={InNav} />
    <Nav.Screen name='TermsNav' component={TermsNav} options={{ presentation: 'modal' }} initialParams={{type: route.params?.type, text: route.params?.text}} />
  </Nav.Navigator>
)
}

export default OutNav