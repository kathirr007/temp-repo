<script setup lang="ts">
import VueMultiselect from 'vue-multiselect';

const props = withDefaults(defineProps<{
  loading?: boolean;
}>(), {
  loading: false
});
</script>

<template>
  <VueMultiselect v-bind="{ ...props, ...$attrs }">
    <template v-if="!loading" #caret="{ toggle }">
      <Icon icon="mdi:chevron-down" class="text-2xl multiselect__select" @mousedown.prevent.stop="toggle()" />
    </template>
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name v-bind="scope" />
    </template>
  </VueMultiselect>
</template>

<style scoped>

</style>
