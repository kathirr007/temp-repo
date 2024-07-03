import type { MaybeRef } from 'vue';

export function useListUtils(listCollection?: MaybeRef<Record<string, any>[]> | Record<string, any>[], searchField?: string) {
  const searchTerm = ref('');
  const selectedItems = ref<Record<string, any>[]>([]);
  const searchListRef = ref(null);
  const listData = toRef(listCollection || []);

  const searchItemsList = computed(() => {
    if (searchTerm.value === '') {
      return [];
    }
    let matches = 0;
    return listData.value.filter((item) => {
      if (item[searchField as string].toLowerCase().includes(searchTerm.value.toLowerCase())) {
        matches++;
        return item;
      }
      return false;
    });
  });

  function addItem(item: Record<string, any>) {
    selectedItems.value.push(item);
    searchTerm.value = '';
  }

  function removeItem(itemId: string) {
    const foundIndex = selectedItems.value.findIndex(item => item.id === itemId);
    if (foundIndex !== -1) {
      selectedItems.value.splice(foundIndex, 1);
    }
  }

  return {
    searchTerm,
    selectedItems,
    searchListRef,
    searchItemsList,
    addItem,
    removeItem
  };
}
