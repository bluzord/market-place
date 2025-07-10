<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLocationStore } from '@/features/LocationPicker/model/store.ts'
import { LocationPickerConfirmPopover } from '@/features/LocationPicker/ui/LocationPickerConfirmPopup'
import { LocationPickerModal } from '@/features/LocationPicker/ui/LocationPickerModal'
import { Icon } from '@/shared/ui/Icon'

const locationStore = useLocationStore()
const triggerRef = ref<HTMLElement | null>(null)

onMounted(() => {
  locationStore.loadCityFromStorage()
})
</script>

<template>
  <div class="location-picker">
    <button
      ref="triggerRef"
      class="location-picker__trigger"
      aria-label="Выбрать город"
      title="Выбрать город"
      @click="locationStore.openModal"
      @keydown.enter="locationStore.openModal"
    >
      <Icon icon="location" class="location-picker__trigger-icon" />
      <span class="location-picker__trigger-city">
        {{ locationStore.selectedCity ?? locationStore.guessedCity }}
      </span>
    </button>

    <Teleport to="#modal">
      <LocationPickerConfirmPopover :reference-el="triggerRef" />
      <LocationPickerModal />
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
@use 'styles';
</style>
