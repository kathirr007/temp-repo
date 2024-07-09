<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRouteParams } from '@vueuse/router';

const emits = defineEmits<{
  (e: 'listUpdate', value: Record<string, any>[]): void;
}>();

const currentRoute = useRoute();
const pageId = useRouteParams('id');
const searchTerm = ref('');
// const uriPattern = useRouteQuery('uriPattern');

const { getOnePage } = usePagePermissions(true);

const { data: pageData, isLoading, isFetching } = useQuery({
  queryKey: ['get-one-page'],
  queryFn: async () => {
    const data = await getOnePage({
      viewId: pageId.value as string,
      uriPattern: currentRoute.query.uriPattern as string

    });
    if (data) {
      console.log('page-data', data);
      return data;
    }
    return null;
  }
});
</script>

<template>
  <div class="min-w-screen">
    <div class="space-y-3 mt-3 relative">
      <!-- <div class="flex-col sm:flex-row flex justify-between w-full">
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
      </div> -->

      <ul v-if="searchTerm" ref="searchListRef" class="search-list absolute">
        <!-- <template v-if="searchItemsList.length">
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
        </template> -->
        <li>test data</li>
      </ul>
    </div>
    <div class="permission-pages-wrapper">
      <ul class="permission-pages-list">
        <template v-if="pageData">
          <li class="flex justify-between items-center py-2">
            <!-- <span class="page-title">
              {{ pageData.uri_pattern }}
            </span> -->
            <span class="page-url">
              {{ pageData.uri_pattern }}
            </span>
            <span class="page-id">
              {{ pageData.view_id }}
            </span>
            <!-- <span
              tabindex="0"
              class="p-1 px-2 cursor-pointer mr-1 text-2xl"
              @click="removeItem(item.id)"
              @keyup.enter="removeItem(item.id)"
            >
              &times;
            </span> -->
          </li>
        </template>
        <template v-else>
          <li class="text-center py-2">
            {{ 'No page added.' }}
          </li>
        </template>
      </ul>
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
