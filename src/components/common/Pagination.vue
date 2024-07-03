<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(['change', 'perPageChange']);

const { currentPage: currentPageProp, totalPages: totalPagesProp } = toRefs(props);

const startPage = computed(() => {
  if (currentPageProp.value === 1) {
    return 1;
  }

  if (currentPageProp.value === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1;
  }

  return currentPageProp.value - 1;
});

const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
});
const pages = computed(() => {
  const range = [];

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === currentPageProp.value
    });
  }

  return range;
});
const isInFirstPage = computed(() => {
  return currentPageProp.value === 1;
});
const isInLastPage = computed(() => {
  return currentPageProp.value === props.totalPages;
});

function onClickFirstPage() {
  emits('change', 1);
}
function onClickPreviousPage() {
  emits('change', currentPageProp.value - 1);
}
function onClickPage(page) {
  emits('change', page);
}
function onClickNextPage() {
  emits('change', currentPageProp.value + 1);
}
function onClickLastPage() {
  emits('change', props.totalPages);
}
function isPageActive(page) {
  return currentPageProp.value === page;
}

function handlePerPageChange(e) {
  emits('perPageChange', +e.target.value);
}
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white py-3">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div class="flex space-x-3 items-center">
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ (perPage * currentPageProp) - (perPage - 1) }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ perPage * currentPageProp > total ? total : perPage * currentPageProp }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex text-sm items-center per-page space-x-2">
          <label for="perPage">Per Page</label>
          <select id="perPage" class="p-2 rounded-md border appearance-none	bg-none" @change="handlePerPageChange">
            <option>10</option>
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
        </div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0" aria-label="Go to first page" :class="isInFirstPage ? 'hover:bg-none' : 'hover:bg-gray-50'" :disabled="isInFirstPage" @click.stop="onClickFirstPage">
            <span class="sr-only">First</span>
            <!-- <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /> -->
            <Icon icon="mdi:chevron-double-left" class="h-5 w-5" />
          </button>
          <button class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" aria-label="Go to previous page" :class="isInFirstPage ? 'hover:bg-none' : 'hover:bg-gray-50'" :disabled="isInFirstPage" @click.stop="onClickPreviousPage">
            <span class="sr-only">Previous</span>
            <!-- <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" /> -->
            <Icon icon="mdi:chevron-left" class="h-5 w-5" />
          </button>
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
          <template v-for="(page, index) in pages" :key="index">
            <button
              aria-current="page" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :class="{ 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-600 ring-0': currentPage === page.name }"
              :disabled="page.isDisabled"
              :aria-label="`Go to page number ${page.name}`"
              @click.stop="onClickPage(page.name)"
            >
              {{ page.name }}
            </button>
          </template>
          <button
            :disabled="isInLastPage" class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" :class="isInLastPage ? 'hover:bg-none' : 'hover:bg-gray-50'" aria-label="Go to next page"
            @click.stop="onClickNextPage"
          >
            <span class="sr-only">Next</span>
            <Icon icon="mdi:chevron-right" class="h-5 w-5" />
          </button>
          <button :disabled="isInLastPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" :class="isInLastPage ? 'hover:bg-none' : 'hover:bg-gray-50'" aria-label="Go to last page" @click.stop="onClickLastPage">
            <span class="sr-only">Last</span>
            <Icon icon="mdi:chevron-double-right" class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
