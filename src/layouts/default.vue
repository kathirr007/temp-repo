<script setup lang="ts">
const transitionName = ref('fade');
const currentRoute = useRoute();

watch(currentRoute, async (val, oldVal) => {
  const toDepth = val.path.split('/').length;
  const fromDepth = oldVal.path.split('/').length;
  transitionName.value = toDepth < fromDepth ? 'slide-left' : 'slide-right';
});
</script>

<template>
  <div id="layout-main-container">
    <div class="layout-content-wrapper">
      <div class="layout-main">
        <div class="layout-content">
          <router-view v-slot="{ Component, route }">
            <transition :name="transitionName" :appear="true" mode="out-in">
              <div :key="route.fullPath">
                <component :is="Component" :key="route" />
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
