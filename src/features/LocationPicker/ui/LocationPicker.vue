<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocationStore } from '@/features/LocationPicker/model/store.ts'
import { LocationPickerModal } from '@/features/LocationPicker/ui/LocationPickerModal'
import { Icon } from '@/shared/ui/Icon'

const locationStore = useLocationStore()

onMounted(() => {
  locationStore.loadCityFromStorage()
})
</script>

<template>
  <div class="location-picker">
    <button
      class="location-picker__trigger"
      aria-label="Выбрать город"
      title="Выбрать город"
      @click="locationStore.openModal"
    >
      <Icon icon="location" class="location-picker__trigger-icon" />
      <span class="location-picker__trigger-city">
        {{ locationStore.selectedCity ?? 'Москва' }}
      </span>
    </button>

    <Teleport to="#modal">
      <LocationPickerModal />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>
