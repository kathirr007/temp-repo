<script setup lang="ts">
const selectedPagesLength = ref(0);

function updateSelectedPagesLength(list: Record<string, any>[]) {
  selectedPagesLength.value = list.length;
}
</script>

<template>
  <header class="py-4">
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
  <main class="p-8 main-wrapper">
    <section class="pages mb-4 p-4">
      <Accordion>
        <template #title>
          Adding Permissions {{ selectedPagesLength ? `to ${selectedPagesLength} pages` : '' }}
        </template>
        <template #body>
          <AddPages @list-update="updateSelectedPagesLength" />
        </template>
      </Accordion>
    </section>
    <section class="users p-4">
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
.main-wrapper {
  background-color: #f8f8f8;

  .pages,
  .users {
    border-radius: 6px;
    background-color: #fff;
  }
  .permission-pages-list {
    list-style-type: none;
    margin: 0;
    padding: 1rem 0 0 0;
    li {
      border-top: 1px solid #e5e5e5;
      &:last-child {
        border-bottom: 1px solid #e5e5e5;
      }

      .action-button {
        font-size: 1.5rem;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
}
</style>
