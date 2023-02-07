import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const postRequest = async (url, body, header) => {
  const response = await axios.post(`${API_URL}${url}`, body, header)

  return response
}

export const getRequest = async (url, header) => {
  const response = await axios.get(`${API_URL}${url}`, header)

  return response
}