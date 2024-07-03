import { toRef } from 'vue'
import { groupData, pageData } from '~/mocks'

export function useApplyPermissions() {
  const pageListMock = toRef(pageData)
  const groupListMock = toRef(groupData)

  return {
    pageListMock,
    groupListMock,
  }
}
