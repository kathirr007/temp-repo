<script setup lang="ts" generic="T extends any, O extends any">
import { useQuery } from '@tanstack/vue-query';

defineOptions({
  name: 'PermissionsListPage'
});

const params = reactive({
  current_page: 1,
  pagesize: 10,
  search: '',
  column_filters: []
});

// const rows: any = ref(null);
// const loading: any = ref(true);
// const total_rows = ref(0);

const cols = ref([
  { field: 'uri_pattern', title: 'Page URL', type: 'string' },
  { field: 'view_id', title: 'Page ID', type: 'string' },
  { field: 'action', title: '', type: 'string', headerClass: 'justify-end'
  }
]) || [];

// const queryClient = useQueryClient();
const { getPages } = usePagePermissions(true);

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

let timer: any;
function filterUsers() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // getUsers();
    getPages({});
    // queryClient.invalidateQueries({queryKey: ['get-pages']})
  }, 300);
}

function changeServer(data: any) {
  console.log('changed...');

  params.current_page = data.current_page;
  params.pagesize = data.pagesize;
  params.column_filters = data.column_filters;
  params.search = data.search;

  if (data.change_type === 'search') {
    filterUsers();
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
      <input v-model="params.search" type="text" class="form-input max-w-xs" placeholder="Search...">
    </div>

    <vue3-datatable
      :rows="pagesListData || []"
      :columns="cols"
      :loading="loadingPagesListData || fetchingPagesListData"
      :total-rows="pagesListData?.length"
      :is-server-mode="true"
      :page-size="params.pagesize"
      :search="params.search"
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
  </main>
</template>
