import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useAttrs } from '..'

const TestComp = defineComponent({
  setup() {
    useAttrs()
  },
})

describe('use-attr', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
