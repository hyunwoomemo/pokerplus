// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native'
import Root from './navigator/Root';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { MyDrawer } from './navigator/Drawer';
import Layout from './components/Layout';
import OutNav from './navigator/OutNav';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InNav from './navigator/InNav';
// import * as SplashScreen from 'expo-splash-screen'

// SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

const Nav = createNativeStackNavigator()

export default function App() {

  const [ready, setReady] = useState(true);
  const [isLogin, setIsLogin] = useState();
  const [user, setUser] = useState();

  const getUser = async () => {
    const data = await AsyncStorage.getItem('token')
    const userData = await AsyncStorage.getItem('user')
    setReady(false)
    setIsLogin(data)
    setUser(userData)
  }

  useEffect(() => {
    getUser()
  }, [])

  console.log('user', user)

  if (ready) return <View><Text>Loading...</Text></View>

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle='dark-content' backgroundColor='#ebf2f0' />
        <SafeAreaView style={Platform.OS === 'android' ? { flex: 1, backgroundColor: '#ebf2f0' } : { flex: 1, paddingTop: 0, backgroundColor: '#ebf2f0' }}>
          
          <NavigationContainer>
            <Nav.Navigator>
              {isLogin ? <Nav.Screen name='InNav' component={InNav} options={{ headerShown: false }} /> : <Nav.Screen name='OutNav' component={OutNav} options={{ headerShown: false }} />}
            {/* <Nav.Screen name='OutNav' component={OutNav} options={{ headerShown: false }} /> */}
              {/* <OutNav /> */}
            </Nav.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

