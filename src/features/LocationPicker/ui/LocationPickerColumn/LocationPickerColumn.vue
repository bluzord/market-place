<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  columnType: string
  columnLabel: string
  locationArray: string[]
  selectedLocation: string | null
  handler: (city: string, subject?: string) => void
  subject?: string
}>()

const itemsRef = ref<HTMLElement[]>([])

function scrollToSelected() {
  if (!props.selectedLocation)
    return

  const selectedIndex = props.locationArray.findIndex(item => item === props.selectedLocation)

  if (selectedIndex === -1)
    return

  itemsRef.value[selectedIndex]?.scrollIntoView({ block: 'center' })
}

defineExpose({ scrollToSelected })
</script>

<template>
  <article class="location-picker__modal-column">
    <h3 class="location-picker__modal-column-title">
      {{ columnType }}
    </h3>
    <ul class="location-picker__modal-column-items" role="listbox" :aria-label="columnLabel" tabindex="-1">
      <li
        v-for="location in locationArray"
        ref="itemsRef"
        :key="location"
        tabindex="0"
        class="location-picker__modal-column-item"
        :class="{ 'location-picker__modal-column-item--selected': location === selectedLocation }"
        role="option"
        :aria-selected="location === selectedLocation"
        @click="handler(location, subject)"
        @keydown.enter="handler(location, subject)"
      >
        {{ location }}
      </li>
    </ul>
  </article>
</template>

<style scoped lang="scss">
@use 'styles';
</style>
