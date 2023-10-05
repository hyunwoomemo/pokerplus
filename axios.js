import axios, { AxiosError, AxiosResponse } from 'axios'
// import statusCode from '../../src/utils/statusCode'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import token from './somewhere';

axios.defaults.baseURL = 'https://www.pokerplus.co.kr'

async function getToken() {
  return await AsyncStorage.getItem('token')
}

axios.interceptors.request.use( async (config) => {
  const token = await getToken()
  console.log(token)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers.Cookie = `auth._token.pokerzone=${token}`
    // config.headers['Content-Type'] = 'application/json'
  }
  return config
})

// axios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const { data, status, config } = error.response
//     statusCode(status, error.message, data)
//     return Promise.reject(error)
//   }
// )

const responseBody = (response) => response.data

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(responseBody),
  postXf: (url, body) =>
    axios
      .post(url, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
      .then(responseBody),
  registPost: (url, body) =>
    axios
      .post(url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody),
  joinPost: (url, body) =>
    axios
      .post(url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody),
  editPost: (url, body) =>
    axios
      .post(url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody),
}

export default request
