<script setup lang="ts">
import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/vue'
import { nextTick, ref, watch } from 'vue'
import { useLocationStore } from '@/features/LocationPicker/model/store.ts'
import { Button } from '@/shared/ui/Button'

const props = defineProps<{
  referenceEl: HTMLElement | null
}>()

const locationStore = useLocationStore()

const popoverEl = ref<HTMLElement | null>(null)
const arrowEl = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

function updatePosition() {
  if (props.referenceEl && popoverEl.value) {
    computePosition(props.referenceEl, popoverEl.value, {
      placement: 'bottom',
      middleware: [
        offset(20),
        flip(),
        shift({ padding: 8 }),
        arrow({ element: arrowEl }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(popoverEl.value!.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      })

      const arrowData = middlewareData.arrow

      if (arrowData && arrowEl.value) {
        const side = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'
        const staticSide = {
          top: 'bottom',
          bottom: 'top',
          left: 'right',
          right: 'left',
        }[side]

        Object.assign(arrowEl.value!.style, {
          left: arrowData.x ? `${arrowData.x - 100}px` : '',
          top: arrowData.y ? `${arrowData.y}px` : '',
          bottom: '',
          right: '',
          [staticSide!]: '-7px',
          position: 'absolute',
        })
      }
    })
  }
}

watch(() => locationStore.isPopoverOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    await nextTick()
    updatePosition()
    if (props.referenceEl && popoverEl.value) {
      cleanup = autoUpdate(props.referenceEl, popoverEl.value, updatePosition)
    }
  }
  else {
    if (cleanup) {
      cleanup()
      cleanup = null
    }
  }
})
</script>

<template>
  <section
    v-if="locationStore.isPopoverOpen"
    ref="popoverEl"
    class="location-picker__popover"
    role="dialog"
    aria-modal="true"
    aria-describedby="location-popover-desc"
  >
    <div ref="arrowEl" class="location-picker__popover-arrow" aria-hidden="true" />
    <div class="location-picker__popover-container" role="document">
      <header class="location-picker__popover-info">
        <p id="location-popover-desc" class="location-picker__popover-city">
          Ваш город <strong>{{ locationStore.guessedCity }}</strong>?
        </p>
      </header>
      <footer class="location-picker__popover-choice">
        <Button
          class="location-picker__popover-accept" variant="filled"
          @click="locationStore.selectCity(locationStore.guessedCity, locationStore.guessedSubject)"
          @keydown.enter="locationStore.selectCity(locationStore.guessedCity, locationStore.guessedSubject)"
        >
          Все верно
        </Button>
        <Button
          class="location-picker__popover-deny"
          variant="filled"
          @click="locationStore.openModal()"
          @keydown.enter="locationStore.openModal()"
        >
          Выбрать город
        </Button>
      </footer>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'styles';
</style>
