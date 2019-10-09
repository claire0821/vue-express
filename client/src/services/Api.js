import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8089/`,
    responseType: 'json',
    timeout: 50000
    // timeout: 5000,
    // withCredentials: true // 允许携带cookie
  })
}
