import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { NOOP } from '@jirafa/utils'
import { JButton } from '@jirafa/components'

const JIRAFA = 'J I R A F A'

const _mount = (setup = NOOP, options = {}) =>
  mount(
    defineComponent({
      setup,
      render() {
        return <JButton {...this.$attrs}>{JIRAFA}</JButton>
      },
    }),
    options
  )

describe('use-prop', () => {
  it('should retrun props.size', () => {
    const wrapper = _mount(undefined, { props: { size: 'mini' } })

    const button = wrapper.findComponent(JButton)
    expect(button.classes()).toContain('j-button--mini')
  })
})
