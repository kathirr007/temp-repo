<script setup>
import { computed, ref } from 'vue';

const people = [
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
];

const selectedPeople = ref([]);
const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < people.length);
</script>

<template>
  <div class="">
    <div class="mt-8 flow-root">
      <div class="ml-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="relative">
            <table class="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="relative px-4 sm:w-6 sm:px-3">
                    <input type="checkbox" class="absolute top-1/2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="selectedPeople.length === people.length" :indeterminate="indeterminate" @change="selectedPeople = $event.target.checked ? people.map((p) => p.email) : []">
                  </th>
                  <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in people" :key="person.email" :class="[selectedPeople.includes(person.email) && 'bg-gray-50']">
                  <td class="relative px-4 sm:w-6 sm:px-3">
                    <!-- <div v-if="selectedPeople.includes(person.email)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" /> -->
                    <div class="mt-2">
                      <input v-model="selectedPeople" type="checkbox" class="absolute  top-1/2 mt-3 h-4 w-4 rounded border-gray-300 " :value="person.email">
                    </div>
                  </td>
                  <td class="whitespace-nowrap py-4 pr-3 text-sm font-medium" :class="[selectedPeople.includes(person.email) ? 'text-indigo-600' : 'text-gray-900']">
                    {{ person.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.title }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.email }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ person.role }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Edit<span class="sr-only">, {{ person.name }}</span>
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
