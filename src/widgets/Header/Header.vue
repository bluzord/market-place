<script setup lang="ts">
import { LocationPicker } from '@/features/LocationPicker'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'
import { SearchBar } from '@/shared/ui/SearchBar'
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <div class="header__top">
        <div class="header__top-left">
          <Logo device="desktop" :height="50" />
          <LocationPicker class="header__location-picker" />
        </div>
        <!-- TODO: компонент поиска товаров -->
        <SearchBar placeholder="Поиск товаров" />
        <div class="header__top-right">
          <div class="header__contact">
            <p class="header__contact-text">
              Бесплатный звонок
            </p>
            <p class="header__contact-number">
              8 800 555 35 35
            </p>
          </div>
          <Button class="header__login-button" variant="outlined">
            Войти
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use './styles.scss';
</style>
