<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const isOpen = ref(true);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="accordion">
    <div class="accordion__title">
      <div class="flex justify-between">
        <slot name="title" />
        <span class="open-close-icon" tabindex="0" @click="toggleOpen">
          <Icon :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
        </span>
      </div>
    </div>
    <transition :name="isOpen ? 'slide-down' : 'fade'" mode="out-in">
      <div v-show="isOpen" class="accordion__content">
        <slot name="body" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  &__content {
    font-size: 1rem;
  }

  .open-close-icon {
    font-size: 1.5rem;
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
