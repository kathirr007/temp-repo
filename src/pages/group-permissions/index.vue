<script setup lang="ts" generic="T extends any, O extends any">
import { DrawerSize, type PaginationParams } from '@/types/common.type';
import type Vue3Datatable from '@bhplugin/vue3-datatable';
import { useQuery } from '@tanstack/vue-query';

defineOptions({
  name: 'GroupPermissionsList'
});

const datableRef = ref<InstanceType<typeof Vue3Datatable> | null>(null);
const cols = ref([
  { field: 'uri_pattern', title: 'Page URL', type: 'string' },
  { field: 'view_id', title: 'Page ID', type: 'string' },
  { field: 'action', title: '', type: 'string', headerClass: 'justify-end'
  }
]) || [];
const selectedGroups = ref<Record<string, any>[]>([]);
const selectedNewGroups = ref<Record<string, any>[]>([]);
const openDrawer = ref(false);
const isLoading = ref(false);

const drawerOptions = ref({
  visible: computed(() => !!openDrawer.value),
  drawerSize: DrawerSize.medium,
  title: 'Add Users',
  showFooter: true,
  submitLabel: 'Add',
  onClose: () => openDrawer.value = false,
  onSubmit: handleAddNewUsers,
  loading: computed(() => !!isLoading.value)
});

// const queryClient = useQueryClient();
const { getPages } = usePagePermissions(true);
const { params } = usePagination({});
const router = useRouter();

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

function gotoManage(data: any) {
  router.push({ name: '/page-permissions/[id]/',
    params: { id: data.view_id },
    query: { uriPattern: data.uri_pattern }
  });
}

function handleRowSelect(rows: Record<string, any>[]) {
  selectedGroups.value = [...rows];
}

function handleItemsSelected(groups: Record<string, any>[]) {
  selectedNewGroups.value = [...groups];
}

function handleAddNewUsers() {
  isLoading.value = true;
  // TODO: remove once actual api integrated
  console.log(selectedNewGroups.value);
  useTimeoutFn(() => {
    isLoading.value = false;
    openDrawer.value = false;
  }, 1000);
}
</script>

<template>
  <div class="py-6 px-8 bg-gray-100">
    <header class="pb-4">
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
    <main class="main-wrapper py-4">
      <div class="mb-5 flex justify-between">
        <input v-model="params.search" type="search" class="form-input max-w-xs border border-gray-400 rounded-md p-1 px-2.5 w-2/5" placeholder="Search...">
        <div class="actions flex items-center space-x-2">
          <button type="button" class="flex items-center space-x-0.5 rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-gray-900  hover:bg-gray-50 text-pink-600" @click="openDrawer = true">
            <Icon class="h-5 w-5" icon="mdi:plus" /> <span>Add Users</span>
          </button>
          <button v-if="selectedGroups.length" type="button" class="flex items-center space-x-0.5 rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-gray-900  hover:bg-gray-50">
            <Icon class="h-5 w-5" icon="mdi:close" /> <span>Remove</span>
          </button>
        </div>
      </div>
      <div class="p-3 shadow-md rounded-md border-1 border bg-white">
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
          has-checkbox
          :pagination="true"
          class="custom-bh-table hide-pagination"
          row-class="bg-white"
          cell-class="bg-white border-y border-gray-200"
          @change="changeServer"
          @row-select="handleRowSelect"
        >
          <template #action="{ value }">
            <div class="text-right">
              <!-- <router-link
                :to="{ name: '/page-permissions/[id]/',
                       params: { id: data.value.view_id },
                       query: { uriPattern: data.value.uri_pattern },
                }"
              >
            </router-link> -->
              <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="gotoManage(value)">
                Manage
              </button>
            </div>
          </template>
        </vue3-datatable>
        <template v-if="pagesListData">
          <CommonPagination :total-records="pagesListData?.length" :per-page="10" :current-page="params.current_page" pagination-type="simple" @change:simple="changeServer" />
        </template>
      </div>
    </main>
  </div>
  <CommonDrawer v-bind="{ ...drawerOptions }">
    <AddGroups is-in-drawer @items-selected="handleItemsSelected" />
  </CommonDrawer>
</template>

<style lang="scss" scoped>
:deep(.custom-bh-table) {
  thead th,
  td {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
  }
  &.hide-pagination {
    .bh-pagination {
      display: none;
    }
  }
  input[type='checkbox']:checked + div,
  .bh-table-responsive input[type='checkbox']:indeterminate + div {
    --tw-border-opacity: 1;
    border-color: $brand;
    --tw-bg-opacity: 1;
    background-color: $brand;
  }
}
</style>
