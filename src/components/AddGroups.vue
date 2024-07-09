<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import VueMultiselect from 'vue-multiselect';

const searchTerm = ref('');
const isConfirmDialog = ref(false);
const selectedPage = ref();

const callSearchGroup = computed(() => !!searchTerm.value.length);

const queryClient = useQueryClient();
const { pageListMock } = usePagePermissions();
const { searchGroups } = useUserGroups(true);
// const selectedGroups = ref([]);

const { selectedItems: selectedGroups, selectedItem: selectedGroup, removeItem } = useListUtils();

const invalidateSearch = useDebounceFn(() => queryClient.invalidateQueries({ queryKey: ['search-groups'] }), 1000);

function onSearch(termValue: string) {
  console.log('...searching');
  searchTerm.value = termValue;
  invalidateSearch();
}

const { data: userGroupsData, isLoading: loadingUserGroups, isFetching: fetchingUserGroups } = useQuery({
  queryKey: ['search-groups'],
  queryFn: async () => {
    const filterString = `displayName ${searchTerm.value}`;
    const data = await searchGroups({ filters: filterString
    });
    if (data) {
      console.log('user-groups-data', data);
      return data;
    }
    return null;
  },
  enabled: callSearchGroup
});

function prepareConfirmRemove(item: Record<string, any>) {
  selectedGroup.value = item;
  isConfirmDialog.value = true;
}

function handleConfirmRemove() {
  removeItem(selectedGroup.value?.displayName, 'displayName');
  handleConfirmCancel();
}

async function handleConfirmCancel() {
  isConfirmDialog.value = false;
  await nextTick();
  selectedGroup.value = undefined;
}
</script>

<template>
  <div class="min-w-screen">
    <div class="space-y-3 mt-3 relative">
      <div class="flex-col sm:flex-row flex justify-between w-full items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div class="w-full md:w-1/3 sm:w-80">
          <VueMultiselect
            v-model="selectedGroups" :options="userGroupsData || []" :multiple="true" :close-on-select="false" :clear-on-select="false"
            :preserve-search="true" placeholder="Type to search groups..." label="displayName" track-by="displayName" select-label=""
            selected-label="" deselect-label="" class="select-groups-dropdown"
            :loading="loadingUserGroups || fetchingUserGroups"
            @search-change="onSearch"
          >
            <template #selection="{ values, isOpen }">
              <span
                v-if="values.length"
                v-show="!isOpen"
                class="multiselect__single"
              >
                {{ values.length }} group{{ values.length > 1 ? 's' : '' }} selected
              </span>
            </template>
            <template #noResult>
              Oops! No elements found. Consider changing the search query.
            </template>
            <template #option="props">
              <div class="option__desc flex flex-1 items-center cursor-pointer space-x-2">
                <input :id="props.option.displayName" v-model="selectedGroups" :value="props.option" name="selectedGroups" type="checkbox">
                <div class="flex flex-col">
                  <div class="group-name font-bold">
                    {{ props.option.displayName }}
                  </div>
                  <div class="group-type">
                    {{ props.option.resourceType }}
                  </div>
                </div>
              </div>
            </template>
            <template #caret="{ toggle }">
              <Icon icon="mdi:chevron-down" class="text-2xl multiselect__select" @mousedown.prevent.stop="toggle()" />
            </template>
          </VueMultiselect>
        </div>
        <div class="flex items-center">
          <label for="inheritFrom" class="mr-2">Inherit from</label>
          <VueMultiselect
            v-model="selectedPage"
            :options="pageListMock"
            placeholder="Select page"
            label="view_id"
            track-by="view_id"
            select-label=""
            selected-label="" deselect-label=""
            class="w-40 select-page-dropdown"
          >
            <template #option="props">
              <span>
                {{ props.option.view_id }}
              </span>
            </template>
            <template v-if="!(loadingUserGroups || fetchingUserGroups)" #caret="{ toggle }">
              <Icon icon="mdi:chevron-down" class="text-2xl multiselect__select" @mousedown.prevent.stop="toggle()" />
            </template>
          </VueMultiselect>
        </div>
      </div>
    </div>
    <ul class="user-groups-list overflow-y-auto">
      <template v-if="selectedGroups.length">
        <li v-for="item in selectedGroups" :key="item.id" class="flex justify-between items-center py-2">
          <div class="flex flex-1 items-center">
            <label :for="item.id">
              <div class="group-name">
                {{ item.displayName }}
              </div>
              <div class="group-type">
                {{ item.resourceType }}
              </div>
            </label>
          </div>
          <span
            tabindex="0" class="p-1 px-2 cursor-pointer mr-1 text-2xl"
            @click="prepareConfirmRemove(item)"
            @keyup.enter="prepareConfirmRemove(item)"
          >
            &times;
          </span>
        </li>
      </template>
      <template v-else>
        <li class="flex justify-center items-center py-2">
          No Group added.
        </li>
      </template>
    </ul>
  </div>
  <CommonConfirmDialog :visible="isConfirmDialog" :record-to-remove="selectedGroup" title="Confirm Remove Group" @confirm="handleConfirmRemove" @cancel="handleConfirmCancel" />
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
  .group-name {
    font-size: 90%;
    font-weight: bold;
  }
  .group-type {
    font-size: 90%;
  }
  /* > li {
    padding: 0.25rem 1rem;
    transition: background 0.3s;
    &:first-child {
      padding-top: 0.75rem;
    }
    &:last-child {
      padding-bottom: 0.75rem;
    }
    &:hover {
      background-color: #e5e5e5;
    }
    label {
      display: block;
      width: 100%;
    }
  } */
}
.search-input {
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
.select-page-inherit {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
.user-groups-list {
  padding: 0;
  margin: 0;
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

:deep(.v-select-dropdown) {
  .vs__dropdown-toggle {
    padding: 0.25rem;
  }

  .vs__dropdown-menu {
    .vs__dropdown-option {
      transition: background-color 0.25s;
      &--highlight,
      &:hover {
        background-color: #ccc;
      }
    }
  }
}

:deep(.select-page-dropdown) {
  width: 10rem !important;
}

:deep(.select-groups-dropdown) {
  .multiselect__option--selected {
    font-weight: normal;
  }
}
</style>
