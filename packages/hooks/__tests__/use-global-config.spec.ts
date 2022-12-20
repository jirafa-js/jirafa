import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useGlobalConfig } from '..'

const TestComp = defineComponent({
  setup() {
    useGlobalConfig()
  },
})

describe('use-global-config', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
