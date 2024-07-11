<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { DrawerSize } from '@/types/common.type';

const props = withDefaults(
  defineProps<{
    visible?: boolean;
    title?: string;
    drawerSize?: DrawerSize;
    showFooter?: boolean;
    showSubmitBtn?: boolean;
    showCancelBtn?: boolean;
    loading?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    title: 'Drawer Title',
    drawerSize: DrawerSize.medium,
    showSubmitBtn: true,
    showCancelBtn: true
  }
);

const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'close'): void;
}>();

const open = ref(false);

function closeDrawer() {
  emit('close');
  open.value = false;
}

watchEffect(() => {
  if (props.visible) {
    open.value = props.visible;
  }
  else {
    open.value = false;
  }
});
</script>

<template>
  <!-- <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeDrawer">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen" :class="drawerSize">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                        {{ title }}
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2" @click="closeDrawer">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <Icon icon="mdi:close" class="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <slot />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot> -->
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeDrawer">
      <!-- <div class="fixed inset-0" /> -->
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen" :class="drawerSize">
                <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                          {{ title }}
                        </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500" @click="closeDrawer">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
                            <Icon icon="mdi:close" class="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <slot />
                    </div>
                  </div>
                  <div v-if="showFooter" class="flex flex-shrink-0 justify-start space-x-3 px-4 py-4">
                    <button v-if="showSubmitBtn" type="submit" class="inline-flex justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 min-w-24" @click="$emit('submit')">
                      <Icon v-if="loading" icon="eos-icons:loading" class="h-5 w-5 mr-1.5" /> {{ submitLabel || 'Submit' }}
                    </button>
                    <button v-if="showCancelBtn" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 min-w-24" @click="closeDrawer">
                      {{ cancelLabel || 'Cancel' }}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
