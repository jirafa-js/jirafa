import { mount } from '@vue/test-utils'
import { useId, useIdInjection } from '..'

describe('use-id', () => {
  it('useIdInjection', () => {
    const wrapper = mount({
      setup() {
        const idInjection = useIdInjection()
        return idInjection
      },
    })

    expect(wrapper.vm.prefix).toMatch(/^\d{0,4}$/)
    expect(wrapper.vm.current).toBe(0)
  })

  it('useId', () => {
    const wrapper = mount({
      setup() {
        const id = useId()
        return { id }
      },
    })

    expect(wrapper.vm.id).toMatch(/j-id-\d{0,4}-\d+$/)
  })
})
