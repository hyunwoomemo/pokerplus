import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Tabs from './Tab'
import { MyDrawer } from './Drawer'
import Profile from '../screens/Profile'

const Nav = createNativeStackNavigator()

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{
      headerShown: false,
      
    }}>

      <Nav.Screen name='Drawer' component={MyDrawer } />
      <Nav.Screen name='Tabs' component={Tabs} />
    </Nav.Navigator>
  )
}

export default Root