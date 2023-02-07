import axios from 'axios'

const API_URL = 'localhost:3001/api'

export const postRequest = async (url, body, header) => {
  const response = await axios.post(url, body, header)

  return response
}