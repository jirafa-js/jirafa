import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useForm } from '..'

const TestComp = defineComponent({
  setup() {
    useForm()
  },
})

describe('use-form', () => {
  it('should work', () => {
    const wrapper = mount(TestComp)
    // test code here
    expect(wrapper).toBeDefined()
  })
})
