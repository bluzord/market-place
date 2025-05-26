<script setup lang="ts">
import type { IconName } from '@/shared/ui/Icon'
import { computed } from 'vue'
import { Icon } from '@/shared/ui/Icon'

interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'icon'
  icon?: IconName
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'outlined',
  disabled: false,
})

const buttonVariant = computed<string>(() => {
  return {
    filled: 'button--filled',
    outlined: 'button--outlined',
    icon: 'button--icon',
  }[props.variant]
})

const isIconOnly = computed<boolean>(() =>
  props.variant === 'icon',
)
</script>

<template>
  <button class="button" :class="buttonVariant" :disabled="disabled">
    <slot v-if="!isIconOnly" />
    <Icon v-else :icon="icon" />
  </button>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
