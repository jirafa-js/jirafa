import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useId } from '..'

const TestComp = defineComponent({
  setup() {
    useId()
  },
})

describe('use-id', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
