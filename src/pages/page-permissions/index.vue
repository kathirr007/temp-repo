<script setup lang="ts" generic="T extends any, O extends any">
import type { PaginationParams } from '@/types/common.type';
import type Vue3Datatable from '@bhplugin/vue3-datatable';
import { useQuery } from '@tanstack/vue-query';

defineOptions({
  name: 'PermissionsListPage'
});

const datableRef = ref<InstanceType<typeof Vue3Datatable> | null>(null);
const cols = ref([
  { field: 'uri_pattern', title: 'Page URL', type: 'string' },
  { field: 'view_id', title: 'Page ID', type: 'string' },
  { field: 'action', title: '', type: 'string', headerClass: 'justify-end'
  }
]) || [];

// const queryClient = useQueryClient();
const { getPages } = usePagePermissions(true);
const { params } = usePagination({});

const {
  data: pagesListData,
  isLoading: loadingPagesListData,
  isFetching: fetchingPagesListData
} = useQuery({
  queryKey: ['get-pages'],
  queryFn: async () => {
    const data = await getPages({});

    if (data) {
      console.log(data);
      return data;
    }
    return null;
  }
});

const searchData = useDebounceFn(() => {
  console.log('search event...');
  getPages({});
}, 1000);

function changeServer(data: PaginationParams) {
  console.log('changed...', data);

  if (data.change_type === 'search') {
    searchData();
  }
  else {
    getPages({});
  }
}
</script>

<template>
  <header class="p-4">
    <div class="flex justify-between">
      <div class="go-back flex">
        <button class="p-1 pl-2 pr-3 mr-3 bg-black rounded-md text-white">
          <Icon icon="mdi:account-star" class="text-xl" />
        </button>
        <h2 class="mx-2 text-2xl font-bold">
          Apply Permissions
        </h2>
      </div>
    </div>
  </header>
  <main class="main-wrapper p-8">
    <div class="mb-5">
      <input v-model="params.search" type="search" class="form-input max-w-xs border border-gray-400 rounded-md p-1 px-2.5 w-2/5" placeholder="Search...">
    </div>

    <div class="p-3 shadow-md rounded-md border-1 border border-gray-200">
      <vue3-datatable
        ref="datableRef"
        :rows="pagesListData || []"
        :columns="cols"
        :loading="loadingPagesListData || fetchingPagesListData"
        :total-rows="pagesListData?.length"
        :is-server-mode="true"
        :show-first-page="false"
        :show-last-page="false"
        :page="params.current_page"
        :page-size="params.pagesize"
        :search="params.search"
        :pagination="true"
        :column-filter="true"
        class="custom-bh-table hide-pagination column-filter"
        row-class="bg-white"
        cell-class="bg-white border-y border-gray-200"

        @change="changeServer"
      >
        <template #action="data">
          <div class="text-right">
            <router-link
              :to="{ name: '/page-permissions/[id]/',
                     params: { id: data.value.view_id },
              }"
            >
              <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Manage
              </button>
            </router-link>
          </div>
        </template>
      </vue3-datatable>
      <template v-if="pagesListData">
        <CommonPagination :total-records="pagesListData?.length" :per-page="10" :current-page="params.current_page" pagination-type="simple" @change:simple="changeServer" />
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
:deep(.custom-bh-table) {
  &.hide-pagination {
    .bh-pagination {
      display: none;
    }
  }
}
</style>
