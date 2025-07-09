import type { City } from '@/features/LocationPicker/types'
import ky from 'ky'

const API_cities = 'https://raw.githubusercontent.com/pensnarik/russian-cities/master/russian-cities.json'
const API_ip = 'https://api.ipify.org/'
const API_location = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip='
const TOKEN = import.meta.env.VITE_API_TOKEN

export const api = {
  getCities,
  getIP,
  getLocation,
} as const

async function getCities(): Promise<City[]> {
  return await ky.get(API_cities).json<City[]>()
}

async function getIP(): Promise<string> {
  return await ky.get(API_ip).text()
}

async function getLocation(ipAddress: string): Promise<{ location: { data: { city: string, region: string } } }> {
  return await ky.get(API_location + ipAddress, {
    headers: {
      'Authorization': `Token ${TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }).json()
}
