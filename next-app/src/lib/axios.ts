import { UserStore } from '@/store'
import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import environment from 'src/util/environment'

const axiosInstance = axios.create({
  baseURL: environment.API_URL
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { user } = UserStore.getState()
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${user?.access_token}`,
    'X-API-Key': environment.API_KEY
  }
  return config
})

axiosInstance.interceptors.response.use((response: any) => {
  return response
}, (error: any) => {
  switch (error?.response?.status) {
    case 401:
      message.error('Unauthorized! Please try to login again', undefined, () => {
        window.location.replace('/login')
      })
      break
    case 403:
      message.error('No permission to do this action')
      break
    case 406:
      message.error('Incorrect request flow! Please try again.')
      break
    case 422:
      message.error('Data not correct! Please try to fill the form again.')
      break
    default:
      message.error(error.message)
      break
  }
  return Promise.reject(error)
})

export default axiosInstance
