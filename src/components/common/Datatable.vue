<script setup lang="ts">
import type { ColHeaders } from '@/types/datatable.type';
import { computed, ref } from 'vue';

const props = defineProps<{
  tableData: Record<string, any>[];
  checkbox?: boolean;
  checkboxValueField?: string;
}>();

const emits = defineEmits<{
  (e: 'items-selected', value: Record<string, any>[]): void;
}>();

const colHeaders: ColHeaders[] = [
  {
    fieldName: 'Name',
    attrs: {
      class: 'test-class'
    }
  },
  {
    fieldName: 'Title',
    attrs: {
      class: 'test-class-2'
    }
  },
  {
    fieldName: 'Email',
    attrs: {
      class: 'test-class-3'
    }
  },
  {
    fieldName: 'Role',
    attrs: {
      class: 'test-class-4'
    }
  },
  {
    fieldName: 'Edit',
    colType: 'action',
    hideHeaderCol: true,
    attrs: {
      class: 'test-class-4'
    }
  }
];

const selectedItems = ref<any[]>([]);
const indeterminate = computed(() => selectedItems.value.length > 0 && selectedItems.value.length < props.tableData.length);

watchEffect(() => {
  if (selectedItems.value) {
    emits('items-selected', selectedItems.value);
  }
});
</script>

<template>
  <div class="">
    <div class="mt-8 flow-root">
      <slot name="header" />
      <div class="ml-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative">
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th v-if="checkbox" scope="col" class="relative px-4 sm:w-6 sm:px-3">
                    <input
                      type="checkbox"
                      class="absolute top-1/2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      :checked="selectedItems.length === tableData.length" :indeterminate="indeterminate"
                      @change="selectedItems = ($event.target as HTMLInputElement).checked ? tableData.map((t) => checkboxValueField ? t[checkboxValueField as string] : t) : []"
                    >
                  </th>
                  <template v-for="(item, index) in colHeaders" :key="index">
                    <th
                      scope="col" :data-index="index"
                      class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900" :class="[{ 'pl-3': !checkbox && index === 0 }]" v-bind="item.attrs"
                    >
                      <span :class="{ 'sr-only': item.hideHeaderCol }">{{ item.fieldName }}</span>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="item in tableData" :key="item.email"
                  :class="[selectedItems.includes(item[checkboxValueField as string]) && 'bg-gray-50']"
                >
                  <td v-if="checkbox" class="relative px-4 sm:w-6 sm:px-3">
                    <!-- <div v-if="selectedItems.includes(item.email)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" /> -->
                    <div class="mt-2">
                      <input
                        v-model="selectedItems" type="checkbox"
                        class="absolute  top-1/2 mt-3 h-4 w-4 rounded border-gray-300 "
                        :value="item[checkboxValueField as string]"
                      >
                    </div>
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pr-3 text-sm font-medium"
                    :class="[selectedItems.includes(item[checkboxValueField as string]) ? 'text-pink-600' : 'text-gray-900', { 'pl-3': !checkbox }]"
                  >
                    {{ item.name }}
                  </td>
                  <td class="whitespace-nowrap pr-3 py-4 text-sm text-gray-500">
                    {{ item.title }}
                  </td>
                  <td class="whitespace-nowrap pr-3 py-4 text-sm text-gray-500">
                    {{ item.email }}
                  </td>
                  <td class="whitespace-nowrap pr-3 py-4 text-sm text-gray-500">
                    {{ item.role }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Edit<span class="sr-only">, {{ item.name }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
