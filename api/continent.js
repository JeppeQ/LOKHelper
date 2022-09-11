import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/continent`

export async function getContinents() {
  const url = `${API_ROUTE}/all`
  const response = await axios.get(url).catch(err => console.log(err))

  return response ? response.data : null
}