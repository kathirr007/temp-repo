export const useAccessToken = createGlobalState(() => {
  // return useLocalStorage<string>('accessToken', null);
  return useLocalStorage<string>('accessToken', 'testAuthToken');
});
