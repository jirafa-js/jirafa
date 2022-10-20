import { mount } from '@vue/test-utils'
import JIcon from '../src/icon.vue'

describe('JIcon.vue', () => {
  test('render', () => {
    const wrapper = mount(() => <JIcon color="#000000" size={18} />)
    expect(wrapper.element.getAttribute('style')).toContain(`--color: #000000`)
    expect(wrapper.element.getAttribute('style')).toContain(`font-size: 18px`)
  })
})
