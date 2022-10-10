import axios from 'axios'
import { API_ENDPOINT } from './'

const API_ROUTE = `${API_ENDPOINT}/quest`

export async function getQuests(continent) {
  const url = `${API_ROUTE}/relevant`
  const response = await axios.get(url, {
    params: {
      continent
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getQuestsByDate(date, continent) {
  const url = `${API_ROUTE}/day`
  const response = await axios.get(url, {
    params: {
      continent,
      date
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getQuestsByReward(reward, continent) {
  const url = `${API_ROUTE}/reward`
  const response = await axios.get(url, {
    params: {
      reward,
      continent
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}

export async function getQuestsByName(name) {
  const url = `${API_ROUTE}/name`
  const response = await axios.get(url, {
    params: {
      name
    }
  }).catch(err => console.log(err))

  return response ? response.data : null
}