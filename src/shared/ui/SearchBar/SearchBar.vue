<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, nextTick, ref } from 'vue'
import { Icon } from '@/shared/ui/Icon'

const props = defineProps<{
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const query = useVModel(props, 'modelValue', emit)

const isFocused = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)

const isFilled = computed<boolean>(() => query.value.length > 0)
const isActive = computed<boolean>(() => isFocused.value || isFilled.value)

function handleFocus(): void {
  isFocused.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function handleBlur(): void {
  isFocused.value = false
}

function handleEsc(): void {
  inputRef.value?.blur()
}

function clearInput(): void {
  query.value = ''
}
</script>

<template>
  <div
    tabindex="0"
    class="search-bar"
    :class="[{ 'search-bar--active': isActive }]"
    :aria-label="placeholder"
    @click="handleFocus"
    @focus="handleFocus"
    @keydown.esc="handleEsc"
  >
    <div class="search-bar__center">
      <Icon
        icon="search"
        class="search-bar__icon"
        :class="[{ 'search-bar__icon--active': isFocused }]"
        aria-hidden="true"
      />
      <span v-show="!isActive" class="search-bar__placeholder" aria-hidden="true">{{ placeholder }}</span>
    </div>
    <input
      v-show="isActive"
      ref="inputRef"
      v-model="query"
      type="text"
      class="search-bar__input"
      @blur="handleBlur"
    >
    <Icon
      v-show="isActive && query.length > 0" icon="cross" class="search-bar__cross" aria-hidden="true"
      @click="clearInput"
    />
  </div>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
