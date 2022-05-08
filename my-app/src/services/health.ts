import axios from 'axios'
import { HealthFormValuesType, UserType } from '../types'

const baseUrl = '/api/health'

let token: string = sessionStorage.getItem('user')
  ? `bearer ${JSON.parse(sessionStorage.getItem('user')!).token}`
  : ''

const setToken = (data: UserType) => {
  token = `bearer ${data.token}`
}

const createHealth = async (values: HealthFormValuesType) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, values, config)
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, createHealth }
