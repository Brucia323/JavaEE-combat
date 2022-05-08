import axios from 'axios'
import { UserType } from '../types'

const baseUrl = '/api/health'

let token: string = sessionStorage.getItem('user')
  ? `bearer ${JSON.parse(sessionStorage.getItem('user')!).token}`
  : ''

const setToken = (data: UserType) => {
  token = `bearer ${data.token}`
}

const getEpidemic = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(`${baseUrl}/count`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getEpidemic }
