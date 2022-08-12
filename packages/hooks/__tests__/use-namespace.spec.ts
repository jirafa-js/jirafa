import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useNamespace } from '..'

const TestComp = defineComponent({
  setup() {
    useNamespace()
  },
})

describe('use-namespace', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
