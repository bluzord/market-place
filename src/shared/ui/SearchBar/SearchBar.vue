<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Icon } from '@/shared/ui/Icon'

defineProps<{
  placeholder: string
}>()

const isFocused = ref<boolean>(false)
const inputRef = ref<HTMLInputElement | null>(null)
const query = ref<string>('')

const isFilled = computed<boolean>(() => query.value.length > 0)
const isActive = computed<boolean>(() => isFocused.value || isFilled.value)

function handleFocus() {
  isFocused.value = true
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

function handleBlur() {
  isFocused.value = false
}

function handleEsc() {
  inputRef.value?.blur()
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
    <Icon
      icon="search"
      class="search-bar__icon"
      :class="[{ 'search-bar__icon--active': isFocused }]"
      aria-hidden="true"
    />
    <span class="search-bar__placeholder" aria-hidden="true">{{ placeholder }}</span>
    <input
      ref="inputRef"
      v-model="query"
      type="text"
      class="search-bar__input"
      @blur="handleBlur"
    >
  </div>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
