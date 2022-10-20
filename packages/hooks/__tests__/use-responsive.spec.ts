import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useResponsiveObserve } from '..'

const TestComp = defineComponent({
  setup() {
    useResponsiveObserve()
  },
})

describe('use-responsive-observe', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
