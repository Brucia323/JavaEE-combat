import axios from 'axios'
import { LoginValuesType } from '../types'

const baseUrl = '/api/login'

const login = async (values: LoginValuesType) => {
  const response = await axios.post(baseUrl, values)
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
