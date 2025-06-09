<script setup lang="ts">
import type { City } from '@/features/LocationPicker/types'
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useLocationStore } from '@/features/LocationPicker/model/store.ts'
import { Icon } from '@/shared/ui/Icon'
import { Loader } from '@/shared/ui/Loader'
import { SearchBar } from '@/shared/ui/SearchBar'

const isModalOpen = ref<boolean>(false)
const modalRef = ref<HTMLDivElement | null>(null)
const locationStore = useLocationStore()

function openModal() {
  isModalOpen.value = true
  locationStore.fetchCities()
}

function closeModal() {
  isModalOpen.value = false
  locationStore.data = []
}

function selectCity(city: City) {
  locationStore.selectCity(city)
  closeModal()
}

onClickOutside(modalRef, closeModal)

onMounted(() => {
  // locationStore.loadCityFromStorage()
})
</script>

<template>
  <div class="location-picker" @keydown.esc="closeModal">
    <div class="location-picker__main" @click="openModal">
      <Icon icon="location" class="location-picker__icon" />
      <p class="location-picker__city">
        {{ locationStore.selectedCity ?? 'Москва' }}
      </p>
    </div>
    <Teleport to="#modal">
      <div v-if="isModalOpen" class="location-picker__modal">
        <Loader v-if="locationStore.isLoading" />
        <div v-else ref="modalRef" class="location-picker__modal-inner">
          <h1 class="location-picker__modal-title">
            Ваш город
          </h1>
          <Icon icon="cross" class="location-picker__modal-close" @click="closeModal" />
          <SearchBar placeholder="Найти город" class="location-picker__modal-search" />
          <div class="location-picker__popular-cities">
            <button
              v-for="city in locationStore.mostPopulatedCities" :key="city.name"
              class="location-picker__popular-city"
              @click="selectCity(city)"
            >
              {{ city.name }}
            </button>
          </div>
          <div class="location-picker__columns">
            <div class="location-picker__column">
              <h2 class="location-picker__column-title">
                Округ
              </h2>
              <div class="location-picker__column-items">
                <div
                  v-for="district in locationStore.districts" :key="district"
                  class="location-picker__column-item"
                  :class="[{ 'location-picker__column-item--active': district === locationStore.selectedDistrict }]"
                  @click="locationStore.selectDistrict(district)"
                >
                  {{ district }}
                </div>
              </div>
            </div>
            <div class="location-picker__column">
              <h2 class="location-picker__column-title">
                Регион
              </h2>
              <div class="location-picker__column-items">
                <div
                  v-for="subject in locationStore.subjects" :key="subject"
                  class="location-picker__column-item"
                  :class="[{ 'location-picker__column-item--active': subject === locationStore.selectedSubject }]"
                  @click="locationStore.selectSubject(subject)"
                >
                  {{ subject }}
                </div>
              </div>
            </div>
            <div class="location-picker__column">
              <h2 class="location-picker__column-title">
                Город
              </h2>
              <div class="location-picker__column-items">
                <div
                  v-for="city in locationStore.cities" :key="city.name"
                  class="location-picker__column-item"
                  :class="[{ 'location-picker__column-item--active': city.name === locationStore.selectedCity }]"
                  @click="selectCity(city)"
                >
                  {{ city.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
