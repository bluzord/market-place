<script setup lang="ts">
import { Header } from '@/widgets/Header'
import './styles/main.scss'
</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
</style>
