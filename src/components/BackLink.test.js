import { mount } from '@vue/test-utils'
import BackLink from './BackLink'

describe('BackLink', () => {
  test('является экземпляром Vue', () => {
    const wrapper = mount(BackLink)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
