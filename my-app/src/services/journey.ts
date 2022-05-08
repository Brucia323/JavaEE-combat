import axios from 'axios'
import { JourneyFormValuesType, UserType } from '../types'

const baseUrl = '/api/journey'

let token: string = sessionStorage.getItem('user')
  ? `bearer ${JSON.parse(sessionStorage.getItem('user')!).token}`
  : ''

const setToken = (data: UserType) => {
  token = `bearer ${data.token}`
}

const createJourney = async (values: JourneyFormValuesType) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, values, config)
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, createJourney }
