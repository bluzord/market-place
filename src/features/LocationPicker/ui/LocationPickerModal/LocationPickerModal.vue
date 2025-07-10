<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useLocationStore } from '@/features/LocationPicker/model/store.ts'
import { LocationPickerColumn } from '@/features/LocationPicker/ui/LocationPickerColumn'
import { useBreakpoint } from '@/shared/composables/useBreakpoint.ts'
import { Icon } from '@/shared/ui/Icon'
import { Loader } from '@/shared/ui/Loader'
import { SearchBar } from '@/shared/ui/SearchBar'

const locationStore = useLocationStore()
const modalRef = ref<HTMLDivElement | null>(null)
const districtsRef = ref<InstanceType<typeof LocationPickerColumn> | null>(null)
const subjectsRef = ref<InstanceType<typeof LocationPickerColumn> | null>(null)
const citiesRef = ref<InstanceType<typeof LocationPickerColumn> | null>(null)

const { isTablet } = useBreakpoint()

function scrollToSelectedItems() {
  districtsRef.value?.scrollToSelected()
  subjectsRef.value?.scrollToSelected()
  citiesRef.value?.scrollToSelected()
}

onClickOutside(modalRef, locationStore.closeModal)

watch(() => locationStore.isLoading, (isLoading) => {
  if (!isLoading && locationStore.data.length > 0) {
    setTimeout(() => scrollToSelectedItems(), 0)
  }
}, { immediate: true })

onMounted(() => {
  if (!locationStore.isLoading && locationStore.data.length > 0) {
    scrollToSelectedItems()
  }
})
</script>

<template>
  <div
    v-if="locationStore.isModalOpen"
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
          @click="locationStore.closeModal()"
        >
          <Icon icon="cross" class="location-picker__modal-close-icon" />
        </button>
      </header>

      <SearchBar
        :model-value="locationStore.searchQuery"
        placeholder="Найти город"
        class="location-picker__modal-search"
        role="search"
        @update:model-value="locationStore.searchQuery = $event"
      />

      <nav v-if="!locationStore.searchQuery && !isTablet" aria-label="Популярные города">
        <ul class="location-picker__modal-popular-cities" role="listbox">
          <li
            v-for="[subject, city] in locationStore.mostPopulatedCities"
            :key="`${city}(${subject})`"
            class="location-picker__modal-popular-city"
            role="option"
            :aria-selected="city === locationStore.selectedCity"
            @click="locationStore.selectCity(city, subject)"
          >
            {{ city }}
          </li>
        </ul>
      </nav>

      <section v-if="!locationStore.searchQuery && !isTablet" class="location-picker__modal-columns">
        <LocationPickerColumn
          ref="districtsRef" column-type="Округ" column-label="Список округов"
          :location-array="locationStore.districts"
          :selected-location="locationStore.selectedDistrict"
          :handler="locationStore.selectDistrict"
        />

        <LocationPickerColumn
          ref="subjectsRef"
          column-type="Регион" column-label="Список регионов" :location-array="locationStore.subjects"
          :selected-location="locationStore.selectedSubject"
          :handler="locationStore.selectSubject"
        />

        <LocationPickerColumn
          ref="citiesRef"
          column-type="Город" column-label="Список городов" :location-array="locationStore.cities"
          :selected-location="locationStore.selectedCity"
          :subject="locationStore.selectedSubject ?? undefined"
          :handler="locationStore.selectCity"
        />
      </section>

      <section v-if="locationStore.searchQuery || isTablet" class="location-picker__modal-search-results">
        <ul class="location-picker__modal-search-list">
          <li
            v-for="[subject, city] in locationStore.filteredCities"
            :key="`${city}(${subject})`"
            class="location-picker__modal-search-item"
            @click="locationStore.selectCity(city, subject)"
          >
            {{ city }} ({{ subject }})
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>
