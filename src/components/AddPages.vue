<script setup lang="ts">
const emits = defineEmits<{
  (e: 'listUpdate', value: Record<string, any>[]): void;
}>();

const people = ref([
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    name: 'Lindsay Walton 2',
    title: 'Front-end Developer',
    email: 'lindsay.walton-2@example.com',
    role: 'Member'
  },
  {
    name: 'Lindsay Walton 3',
    title: 'Front-end Developer',
    email: 'lindsay.walton-3@example.com',
    role: 'Member'
  }
]);

const { pageListMock } = useApplyPermissions();
const { searchTerm, searchListRef, selectedItems, searchItemsList, removeItem } = useListUtils(pageListMock, 'title');
const currentPage = ref(1);
const totalRecords = ref(98);
const perPage = ref(10);
const totalPages = computed(() => {
  return Math.ceil(totalRecords.value / perPage.value);
});

function onPageChange(page: any) {
  currentPage.value = page;
}

function onPerPageChange(val: any) {
  currentPage.value = 1;
  perPage.value = val;
}

watchEffect(() => {
  if (selectedItems.value) {
    emits('listUpdate', selectedItems.value);
  }
});
</script>

<template>
  <div class="min-w-screen">
    <div class="space-y-3 mt-3 relative">
      <div class="flex-col sm:flex-row flex justify-between w-full">
        <input
          id="search"
          v-model="searchTerm"
          type="search"
          placeholder="Search Pages..."
          class="search-input p-2 mb-1"
        >
        <div>
          <label for="inheritFrom" class="mr-2">Inherit from</label>
          <select id="inheritFrom" class="select-page-inherit p-2">
            <option value="">
              Select Page
            </option>
            <option v-for="(item) in pageListMock" :key="item.id" :value="item">
              {{ item.title }}
            </option>
          </select>
        </div>
      </div>

      <ul v-if="searchTerm" ref="searchListRef" class="search-list absolute">
        <template v-if="searchItemsList.length">
          <li
            v-for="page in searchItemsList"
            :key="page.id"
            class="transition duration-[400ms] cursor-pointer hover:bg-gray-100"
          >
            <label :for="page.id" class="cursor-pointer flex items-center p-2 space-x-2">
              <input :id="page.id" v-model="selectedItems" class="inline-block" :value="page" name="selectedItems" type="checkbox">
              <div class="list-name">
                {{ page.title }}
              </div>
            </label>
          </li>
        </template>
        <template v-else>
          <li class="text-center p-2">
            {{ 'No data found.' }}
          </li>
        </template>
      </ul>
    </div>
    <div class="permission-pages-wrapper">
      <ul class="permission-pages-list">
        <template v-if="selectedItems.length">
          <li v-for="item in selectedItems" :key="item.id" class="flex justify-between items-center py-2">
            <span class="page-title">
              {{ item.title }}
            </span>
            <span class="page-url">
              {{ item.url }}
            </span>
            <span class="page-id">
              {{ item.pageId }}
            </span>
            <span
              tabindex="0"
              class="p-1 px-2 cursor-pointer mr-1 text-2xl"
              @click="removeItem(item.id)"
              @keyup.enter="removeItem(item.id)"
            >
              &times;
            </span>
          </li>
        </template>
        <template v-else>
          <li class="text-center py-2">
            {{ 'No page added.' }}
          </li>
        </template>
      </ul>

      <CommonPagination :total-pages="totalPages" :total="totalRecords" :per-page="perPage" :current-page="currentPage" @change="onPageChange" @per-page-change="onPerPageChange" />

      <CommonDatatable :table-data="people" checkbox-value-field="email" />
      <!-- <vue3-datatable
        :rows="rows"
        :columns="cols"
        :loading="loading"
        :total-rows="total_rows"
        :is-server-mode="true"
        :page-size="params.pagesize"
        :sortable="true"
        :sort-column="params.sort_column"
        :sort-direction="params.sort_direction"
        @change="changeServer"
      /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-list {
  list-style-type: none;
  width: calc(100% - 2rem);
  padding: 0;
  margin: 0;
  top: 2.5rem;
  background-color: #fff;
  border-radius: 0.25rem;
  z-index: 10;
  box-shadow: 0px 0px 2px 0px #333;
  .list-name {
    font-size: 90%;
    font-weight: bold;
  }
  .list-type {
    font-size: 90%;
  }
}
.search-input {
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
.select-page-inherit {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  /* -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none; */
}
.action-button {
  font-size: 1.5rem;
  display: inline-block;
  cursor: pointer;
}
.permission-pages-list {
  padding: 0;
  margin: 0;
  /* height: 42vh; */
  .group-name {
    font-size: 90%;
    font-weight: bold;
  }
  .group-type {
    font-size: 90%;
  }
  > li label {
    display: block;
    width: 100%;
  }
  li {
    border-bottom: 1px solid #e5e5e5;
  }
}
</style>
