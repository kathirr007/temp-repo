import $api from '@/plugins/api';

export function useUserGroups() {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  const getAll = async ({
    page,
    limit,
    filters,
    sortBy
  }: {
    page?: number;
    limit?: number;
    filters?: string;
    sortBy?: string;
  }) => {
    const { data } = await $api.get(
      `${baseUrl}/users`
    );

    return data;
  };

  return {
    getAll
  };
}
