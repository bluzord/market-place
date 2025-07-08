import { computed, onMounted, onUnmounted, ref } from 'vue'

const breakpoints = {
  desktop: 1440.98,
  tablet: 1023.98,
  mobile: 767.98,
  mobileS: 375.98,
}

export function useBreakpoint() {
  const width = ref(window.innerWidth)

  const handleResize = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  const isDesktopAbove = computed(() => width.value > breakpoints.desktop)
  const isDesktop = computed(() => width.value <= breakpoints.desktop)
  const isTablet = computed(() => width.value <= breakpoints.tablet)
  const isMobile = computed(() => width.value <= breakpoints.mobile)
  const isMobileSmall = computed(() => width.value <= breakpoints.mobileS)

  return {
    isDesktopAbove,
    isDesktop,
    isTablet,
    isMobile,
    isMobileSmall,
  }
}
