import { defineComponent, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { NOOP } from '@jirafa/utils'
import { JButton } from '@jirafa/components'
import type {
  ButtonGroupContext,
  FormContext,
  FormItemContext,
} from '@jirafa/tokens'
import {
  ButtonGroupContextInjectKey,
  FormContextInjectKey,
  FormItemContextInjectKey,
} from '@jirafa/tokens'

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

describe('use-form', () => {
  it('basic should work', () => {
    const wrapper = _mount()
    expect(wrapper.findComponent(JButton)).toBeDefined()
    expect(wrapper.text()).toBe(JIRAFA)
  })

  it('props.size should override inject.size', async () => {
    const wrapper = _mount(
      () => {
        provide(FormItemContextInjectKey, { size: 'large' } as FormItemContext)
      },
      {
        props: { size: 'mini' },
      }
    )

    const button = wrapper.findComponent(JButton)
    expect(button.classes()).toContain('j-button--mini')
  })

  it('fallback.size should override inject.size', async () => {
    const wrapper = _mount(() => {
      provide(ButtonGroupContextInjectKey, {
        size: 'mini',
      } as ButtonGroupContext)
      provide(FormItemContextInjectKey, { size: 'large' } as FormItemContext)
    })

    const button = wrapper.findComponent(JButton)
    expect(button.classes()).toContain('j-button--mini')
  })

  it('formItem.size should override form.size', async () => {
    const wrapper = _mount(() => {
      provide(FormItemContextInjectKey, {
        size: 'mini',
      } as FormItemContext)
      provide(FormContextInjectKey, { size: 'large' } as FormContext)
    })

    const button = wrapper.findComponent(JButton)
    expect(button.classes()).toContain('j-button--mini')
  })
})
