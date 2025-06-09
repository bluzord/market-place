import type { City } from '@/features/LocationPicker/types'
import ky from 'ky'

const URL = 'https://raw.githubusercontent.com/pensnarik/russian-cities/master/russian-cities.json'

export const api = {
  getCities,
} as const

async function getCities(): Promise<City[]> {
  return await ky.get(URL).json<City[]>()
}
