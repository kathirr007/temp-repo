import $api from '@/plugins/api';
import { groupData as groupListMock, pageData as pageListMock } from '@/mocks';

export function usePagePermissions(useMockData = false) {
  // const pageListMock = toRef(pageData);
  // const groupListMock = toRef(groupData);

  const baseUrl = 'uxp/v1';
  // const baseUrl = 'https://jsonplaceholder.typicode.com';

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
    /* const { data } = await $api.get(
      `${baseUrl}/users`
    ); */

    return useMockData ? pageListMock : data;
  };

  const getOnePage = async ({
    viewId,
    uriPattern
  }: {
    viewId: string;
    uriPattern: string;
  }) => {
    // getPage?pageId=3000&pageUri=/Device/
    const { data } = await $api.get(
      `${baseUrl}/getPage?pageId=${viewId}&pageUri=${uriPattern}`
    );
    /* const { data } = await $api.get(
      `${baseUrl}/users`
    ); */

    return useMockData ? pageListMock[Math.floor(Math.random() * pageListMock.length)] : data;
  };

  return {
    groupListMock,
    pageListMock,
    getPages,
    getOnePage
  };
}
