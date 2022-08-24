import { mount } from '@vue/test-utils'
import JIcon from '../src/icon.vue'

const JIRAFA = 'J I R A FA'

describe('JIcon.vue', () => {
  it('render test', () => {
    const wrapper = mount(JIcon, {
      slots: { default: JIRAFA },
    })

    expect(wrapper.text()).toEqual(JIRAFA)
  })
})
