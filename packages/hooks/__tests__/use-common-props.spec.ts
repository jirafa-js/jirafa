import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useCommonProps } from '..'

const TestComp = defineComponent({
  setup() {
    useCommonProps()
  },
})

describe('use-common-props', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
