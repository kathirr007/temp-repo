<script setup>
import { computed, ref } from 'vue';

const { groupListMock, pageListMock } = useApplyPermissions();

const { searchTerm, searchListRef, selectedItems, searchItemsList, removeItem, addItem } = useListUtils(groupListMock, 'name');
</script>

<template>
  <div class="min-w-screen">
    <div class="space-y-3 mt-3 relative">
      <div class="flex-col sm:flex-row flex justify-between w-full">
        <input
          id="search"
          v-model="searchTerm"
          type="search"
          placeholder="Search Group..."
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
            v-for="group in searchItemsList"
            :key="group.name"
            class="cursor-pointer hover:bg-gray-100 p-1"
            tabindex="0"
            @click="addItem(group)"
            @keyup.enter="addItem(group)"
          >
            <div class="flex flex-1 items-center cursor-pointer">
              <label :for="group.id" class="cursor-pointer flex-col flex items-center p-2 space-x-2 w-full">
                <!-- <input :id="group.id" v-model="selectedItemss" :value="group" name="selectedItemss" type="checkbox"> -->
                <div class="group-name">
                  {{ group.name }}
                </div>
                <div class="group-type">
                  {{ group.type }}
                </div>
              </label>
            </div>
          </li>
        </template>
        <template v-else>
          <li>
            {{ 'No data found.' }}
          </li>
        </template>
      </ul>
    </div>
    <ul class="user-groups-list overflow-y-auto">
      <template v-if="selectedItems.length">
        <li v-for="item in selectedItems" :key="item.id" class="flex justify-between items-center py-2">
          <div class="flex flex-1 items-center">
            <label :for="item.id">
              <div class="group-name">
                {{ item.name }}
              </div>
              <div class="group-type">
                {{ item.type }}
              </div>
            </label>
          </div>
          <span
            tabindex="0" class="p-1 px-2 cursor-pointer mr-1 text-2xl"
            @click="removeItem(item.id)"
            @keyup.enter="removeItem(item.id)"
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
</style>
