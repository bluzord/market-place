<script setup lang="ts">
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

function selectCity(city: string) {
  locationStore.selectCity(city)
  closeModal()
}

onClickOutside(modalRef, closeModal)

onMounted(() => {
  // locationStore.loadCityFromStorage()
})
q
</script>

<template>
  <div class="location-picker">
    <button
      class="location-picker__trigger"
      aria-label="Выбрать город"
      title="Выбрать город"
      @click="openModal"
    >
      <Icon icon="location" class="location-picker__trigger-icon" />
      <span class="location-picker__trigger-city">
        {{ locationStore.selectedCity ?? 'Москва' }}
      </span>
    </button>

    <Teleport to="#modal">
      <div
        v-if="isModalOpen"
        class="location-picker__modal"
        aria-modal="true"
        aria-labelledby="location-modal-title"
      >
        <Loader v-if="locationStore.isLoading" />
        <div v-else ref="modalRef" class="location-picker__modal-content">
          <header class="location-picker__modal-header">
            <h2 id="location-modal-title" class="location-picker__modal-title">
              Ваш город
            </h2>
            <button
              class="location-picker__modal-close"
              aria-label="Закрыть выбор города"
              @click="closeModal"
            >
              <Icon icon="cross" class="location-picker__modal-close-icon" />
            </button>
          </header>

          <SearchBar
            placeholder="Найти город"
            class="location-picker__modal-search"
            role="search"
          />

          <nav aria-label="Популярные города">
            <ul class="location-picker__modal-popular-cities" role="listbox">
              <li
                v-for="city in locationStore.mostPopulatedCities"
                :key="city"
                class="location-picker__modal-popular-city"
                role="option"
                :aria-selected="city === locationStore.selectedCity"
                @click="selectCity(city)"
              >
                {{ city }}
              </li>
            </ul>
          </nav>

          <section class="location-picker__modal-columns">
            <article class="location-picker__modal-column">
              <h3 class="location-picker__modal-column-title">
                Округ
              </h3>
              <ul class="location-picker__modal-column-items" role="listbox" aria-label="Список округов">
                <li
                  v-for="district in locationStore.districts"
                  :key="district"
                  class="location-picker__modal-column-item"
                  :class="{ 'location-picker__modal-column-item--selected': district === locationStore.selectedDistrict }"
                  role="option"
                  :aria-selected="district === locationStore.selectedDistrict"
                  @click="locationStore.selectDistrict(district)"
                >
                  {{ district }}
                </li>
              </ul>
            </article>

            <article class="location-picker__modal-column">
              <h3 class="location-picker__modal-column-title">
                Регион
              </h3>
              <ul class="location-picker__modal-column-items" role="listbox" aria-label="Список регионов">
                <li
                  v-for="subject in locationStore.subjects"
                  :key="subject"
                  class="location-picker__modal-column-item"
                  :class="{ 'location-picker__modal-column-item--selected': subject === locationStore.selectedSubject }"
                  role="option"
                  :aria-selected="subject === locationStore.selectedSubject"
                  @click="locationStore.selectSubject(subject)"
                >
                  {{ subject }}
                </li>
              </ul>
            </article>

            <article class="location-picker__modal-column">
              <h3 class="location-picker__modal-column-title">
                Город
              </h3>
              <ul class="location-picker__modal-column-items" role="listbox" aria-label="Список городов">
                <li
                  v-for="city in locationStore.cities"
                  :key="city"
                  class="location-picker__modal-column-item"
                  :class="{ 'location-picker__modal-column-item--selected': city === locationStore.selectedCity }"
                  role="option"
                  :aria-selected="city === locationStore.selectedCity"
                  @click="selectCity(city)"
                >
                  {{ city }}
                </li>
              </ul>
            </article>
          </section>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
