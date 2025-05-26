<script setup lang="ts">
import type { IconName } from '@/shared/ui/Icon/types.ts'
import { computed } from 'vue'
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconCart,
  IconCheck,
  IconCoin,
  IconCoupon,
  IconCross,
  IconFilter,
  IconHistory,
  IconLocation,
  IconLogout,
  IconMinus,
  IconNotification,
  IconPhone,
  IconPlus,
  IconRadioFilled,
  IconRadioNotFilled,
  IconSearch,
  IconShow,
  IconUser,
} from '@/shared/ui/Icon/svg'

const props = defineProps<{
  icon?: IconName
}>()

const iconMap: Record<IconName, any> = {
  'arrow-down': IconArrowDown,
  'arrow-left': IconArrowLeft,
  'arrow-right': IconArrowRight,
  'cart': IconCart,
  'check': IconCheck,
  'coin': IconCoin,
  'coupon': IconCoupon,
  'cross': IconCross,
  'filter': IconFilter,
  'history': IconHistory,
  'location': IconLocation,
  'logout': IconLogout,
  'minus': IconMinus,
  'notification': IconNotification,
  'phone': IconPhone,
  'plus': IconPlus,
  'radio-filled': IconRadioFilled,
  'radio-not-filled': IconRadioNotFilled,
  'search': IconSearch,
  'show': IconShow,
  'user': IconUser,
}

const iconComponent = computed(() => {
  if (!props.icon)
    return null
  return iconMap[props.icon]
})
</script>

<template>
  <component :is="iconComponent" />
</template>

<style scoped lang="scss">

</style>
