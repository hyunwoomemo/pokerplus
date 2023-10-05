import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import request from './axios'
// import axios from 'axios'

const BASE_URL = 'https://www.pokerplus.co.kr'

export const resourceApi = {
  posters: () => fetch(`${BASE_URL}/resource/posters`).then((res) => res.json())
}

export const authApi = {
  login: (data) => axios.post(`${BASE_URL}/account/login`, data).then(res => res.data),
  info: () =>  request.get(`${BASE_URL}/account/info`)
}