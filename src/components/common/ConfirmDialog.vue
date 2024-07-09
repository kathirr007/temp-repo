<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const props = withDefaults(
  defineProps<{
    visible?: boolean;
    isRemove?: boolean;
    recordToRemove?: Record<string, unknown>;
    title?: string;
    hideButtons?: boolean;
    hideOkay?: boolean;
    hideCancel?: boolean;
    yesBtnLoading?: boolean;
    dontCloseOnYes?: boolean;
    hideButtonIcons?: boolean;
    hideTitleIcon?: boolean;
    hideClose?: boolean;
    okayLabel?: string;
    cancelLabel?: string;
    disableOkay?: boolean;
    closeOnEscape?: boolean;
  }>(),

  { hideButtonIcons: true }
);

const emit = defineEmits<{
  (e: 'confirm', val?: Record<string, unknown>): void;
  (e: 'cancel'): void;
}>();

const open = ref(false);
// const { visible: open } = toRefs(props);

function removeRecord() {
  emit('confirm', props.recordToRemove);
  open.value = false;
}
function closeModal() {
  emit('cancel');
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
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div v-if="!hideClose" class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeModal">
                  <span class="sr-only">Close</span>
                  <Icon icon="mdi:close" class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <slot
                    v-if="!hideTitleIcon" name="dialog-icon"
                  >
                    <Icon icon="heroicons-outline:exclamation" class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </slot>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                    <slot name="dialog-title">
                      {{ title || 'Dialog Title' }}
                    </slot>
                  </DialogTitle>
                  <div class="mt-2">
                    <slot>
                      <div>
                        Are you sure you want to remove
                        <b
                          v-if="
                            (recordToRemove && recordToRemove.name)
                              || (recordToRemove && recordToRemove.title) || (recordToRemove && recordToRemove.displayName)
                          "
                          class="ml-1"
                        >
                          {{ recordToRemove.name || recordToRemove.title || recordToRemove.displayName }}</b>
                        <template v-else>
                          this record
                        </template>?
                      </div>
                    </slot>
                  </div>
                </div>
              </div>
              <slot v-if="!hideButtons" name="footer">
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button v-if="!hideOkay" type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="removeRecord">
                    <Icon v-if="!hideButtonIcons" icon="heroicons-outline:check-circle" class="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
                    {{ okayLabel ? okayLabel : 'Confirm' }}
                  </button>
                  <button v-if="!hideCancel" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal">
                    <Icon v-if="!hideButtonIcons" icon="heroicons-outline:x-circle" class="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
                    {{ cancelLabel ? cancelLabel : 'Cancel' }}
                  </button>
                </div>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
