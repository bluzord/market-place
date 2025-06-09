import type { City } from '@/features/LocationPicker/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { api } from '@/features/LocationPicker/api'

export const useLocationStore = defineStore('location', () => {
  const data = ref<City[]>([])
  const selectedDistrict = ref<string | null>(null)
  const selectedSubject = ref<string | null>(null)
  const selectedCity = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const mostPopulatedCities = computed(() =>
    [...data.value]
      .sort((a, b) => b.population - a.population)
      .slice(0, 10))

  const districts = computed(() =>
    [...new Set(data.value
      .map(el => el.district))])

  const subjects = computed(() => {
    if (!selectedDistrict.value)
      return []

    return [...new Set(
      data.value
        .filter(el => el.district === selectedDistrict.value)
        .map(el => el.subject),
    )]
  })

  const cities = computed(() => {
    if (!selectedSubject.value)
      return []

    return data.value
      .filter(el => el.subject === selectedSubject.value)
  })

  async function fetchCities() {
    isLoading.value = true
    try {
      data.value = await api.getCities()
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isLoading.value = false
    }
  }

  function selectCity(city: City) {
    selectedCity.value = city.name
    localStorage.setItem('city', city.name)
  }

  function selectDistrict(district: string) {
    selectedDistrict.value = district
    selectedSubject.value = null
  }

  function selectSubject(subject: string) {
    selectedSubject.value = subject
  }

  function loadCityFromStorage() {
    const raw = localStorage.getItem('city')
    if (raw) {
      selectedCity.value = JSON.parse(raw)
    }
  }

  return {
    data,
    selectedCity,
    selectedDistrict,
    selectedSubject,
    isLoading,
    mostPopulatedCities,
    districts,
    subjects,
    cities,
    selectCity,
    selectDistrict,
    selectSubject,
    loadCityFromStorage,
    fetchCities,
  }
})
