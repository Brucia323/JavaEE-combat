import axios from 'axios'
import { DemoType, NewDemoType } from '../types'

const baseUrl: string = 'http://localhost:8080/api/demo'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newDemo: NewDemoType) => {
  const response = await axios.post(baseUrl, newDemo)
  return response.data
}

const update = async (id: number, newDemo: DemoType) => {
  const response = await axios.put(`${baseUrl}/${id}`, newDemo)
  return response.data
}

const remove = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.status
}

export default { getAll, createNew, update, remove }
