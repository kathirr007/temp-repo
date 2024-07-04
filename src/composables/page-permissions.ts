import $api from '@/plugins/api';
import { groupData as groupListMock, pageData as pageListMock } from '@/mocks';

export function usePagePermissions(useMockData = false) {
  // const pageListMock = toRef(pageData);
  // const groupListMock = toRef(groupData);

  const baseUrl = 'uxp/v1';

  const getPages = async ({
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
      `${baseUrl}/getPages`
    );

    return useMockData ? pageListMock : data;
  };

  return {
    getPages,
    groupListMock
  };
}
