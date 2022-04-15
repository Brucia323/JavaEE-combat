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

/**
 * @deprecated
 */
const exportDemo = async () => {
  const response = await axios.get(`${baseUrl}/export`, {
    responseType: 'blob',
  })
  let fileName =
    response.headers['content-disposition'].match(/filename=(.*)/)![1]
  fileName = fileName.replace(new RegExp('"', 'g'), '')
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', decodeURI(fileName))
  document.body.appendChild(tempLink)
  tempLink.click()
  console.log({ tempLink })
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

export default { getAll, createNew, update, remove, exportDemo }
