import $api from '@/plugins/api';

import { groupSearchData } from '@/mocks/index';

export function useUserGroups(useMockData = false) {
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

  const searchGroups = async ({ filters }: { filters: string }) => {
    const baseUrl = 'scim/v1';

    const { data } = await $api.get(
      `${baseUrl}/Groups?filter=${filters}`
    );

    return useMockData ? groupSearchData.Resources : data;
  };

  return {
    getAll,
    searchGroups
  };
}
