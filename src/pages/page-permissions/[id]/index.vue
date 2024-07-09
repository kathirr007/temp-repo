<script setup lang="ts" generic="T extends any, O extends any">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRouteParams } from '@vueuse/router';

defineOptions({
  name: 'AddEditPagePermission'
});

const selectedPagesLength = ref(0);
const currentRoute = useRoute();
const pageId = useRouteParams('id');

const userGroupCols
        = ref([
          { field: 'id', title: 'ID', isUnique: true, type: 'number' },
          { field: 'name', title: 'Name' },
          { field: 'phone', title: 'Phone' },
          { field: 'email', title: 'Email' }
        ]) || [];
const params = reactive({
  current_page: 1,
  pagesize: 10,
  sort_column: 'id',
  sort_direction: 'asc'
});

const queryClient = useQueryClient();
const { getAll: getAllUserGroups } = useUserGroups();
const { getOnePage } = usePagePermissions(true);

function updateSelectedPagesLength(list: Record<string, any>[]) {
  selectedPagesLength.value = list.length;
}

const {
  data: userGroupListData,
  isLoading: loadingUserGroupListData,
  isFetching: fetchingUserGroupListData
} = useQuery({
  queryKey: ['user-groups'],
  queryFn: async () => {
    const data = await getAllUserGroups({});

    if (data) {
      // console.log(data);
      return data;
    }
    return null;
  }
});

const { data: pageData } = useQuery({
  queryKey: ['get-one-page'],
  queryFn: async () => {
    const data = await getOnePage({
      viewId: pageId.value as string,
      uriPattern: currentRoute.query.uriPattern as string

    });
    if (data) {
      // console.log('page-data', data);
      return data;
    }
    return null;
  }
});
</script>

<template>
  <header class="p-4">
    <div class="flex justify-between">
      <div class="go-back flex">
        <button class="p-1 px-3 bg-black rounded-md text-white">
          &#129128;
        </button>
        <h2 class="mx-2">
          Apply Permissions
        </h2>
      </div>
      <button class="p-1 px-3 text-white rounded-md bg-pink-600">
        Save
      </button>
    </div>
  </header>
  <main class="p-8 main-wrapper bg-gray-100">
    <section class="pages mb-4 p-4 rounded-md bg-white">
      <!-- <Accordion>
        <template #title>
          Adding Permissions to {{ currentRoute.params.id as string }}
        </template>
        <template #body>
          <AddPages @list-update="updateSelectedPagesLength" />
        </template>
      </Accordion> -->
      <h2 class="text-xl font-bold">
        Adding Permissions to {{ (currentRoute.params as any).id as string }}
      </h2>
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
    </section>
    <section class="users p-4  rounded-md bg-white">
      <Accordion>
        <template #title>
          Add Group
        </template>
        <template #body>
          <AddGroups />
        </template>
      </Accordion>
    </section>
  </main>
</template>

<style scoped lang="scss">
</style>
