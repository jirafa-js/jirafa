import { mount } from '@vue/test-utils'
import JButton from '../src/button.vue'

const JIRAFA = 'J I R A FA'

describe('JButton.vue', () => {
  it('render test', () => {
    const wrapper = mount(JButton, {
      slots: { default: JIRAFA },
    })

    expect(wrapper.text()).toEqual(JIRAFA)
  })
})
