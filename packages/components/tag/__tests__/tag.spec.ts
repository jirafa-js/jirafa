import { mount } from '@vue/test-utils'
import JTag from '../src/button.vue'

const JIRAFA = 'J I R A FA'

describe('JTag.vue', () => {
  it('render test', () => {
    const wrapper = mount(JTag, {
      slots: { default: JIRAFA },
    })

    expect(wrapper.text()).toEqual(JIRAFA)
  })
})
