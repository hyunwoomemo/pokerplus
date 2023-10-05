import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import OutNav from './navigator/OutNav';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getUserInfo } from './source';
import { RecoilRoot } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import InNav from './navigator/InNav';
import { authApi } from './api';
// import 'react-native-gesture-handler';

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator()

export default function App() {
  const [loading, setLoading] = useState(true)
  console.log(getUserInfo())
  const data = getUserInfo()
  const [userData, setUserData] = useState()
  const user = async () => {
    const data = await AsyncStorage.getItem('user_info')
    console.log('data', data)
    setUserData(data)
    setLoading(false)
  }
  // useEffect(() => {
  useEffect(() => {
    user()
  }, [])
  // }, [])
  console.log('init', userData)


  if (loading) return <View><Text>Loading...</Text></View>

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {userData ? <Stack.Screen name="InNav" component={InNav} options={{ headerShown: false }} /> : <Stack.Screen name="OutNav" component={OutNav} options={{ headerShown: false }} />}
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

