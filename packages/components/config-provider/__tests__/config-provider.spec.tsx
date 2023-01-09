import {
  JButton,
  JForm,
  JFormItem,
  JInput,
  JRadio,
  JTag,
} from '@jirafa/components'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import type { ComponentSizes } from '@jirafa/utils'
import JConfigProvider from '../src/config-provider'

describe('JConfigProvider', () => {
  describe('size-config', () => {
    it('relative components', async () => {
      const size = ref<ComponentSizes>('mini')
      const components = {
        button: JButton,
        radio: JRadio,
        tag: JTag,
        form: JForm,
        'form-item': JFormItem,
        input: JInput,
      }

      const wrapper = mount(() => (
        <JConfigProvider size={size.value}>
          {Object.entries(components).map(([key, Comp]) => (
            <Comp key={key} />
          ))}
        </JConfigProvider>
      ))

      for (const [key, Comp] of Object.entries(components)) {
        const comp = wrapper.findComponent(Comp)
        expect(comp.classes()).toContain(`j-${key}--mini`)
      }
    })
    it('reactive size', async () => {
      const size = ref<ComponentSizes>('mini')
      const wrapper = mount(() => (
        <JConfigProvider size={size.value}>
          <JButton>Button</JButton>
        </JConfigProvider>
      ))

      const button = wrapper.findComponent(JButton)

      expect(button.classes()).toContain('j-button--mini')

      size.value = 'large'
      await nextTick()

      expect(button.classes()).toContain('j-button--large')
    })
  })

  describe('namespace-config', () => {
    it('reactive namespace', async () => {
      const namespace = ref<string>()
      const wrapper = mount(() => (
        <JConfigProvider namespace={namespace.value}>
          <JButton>Button</JButton>
        </JConfigProvider>
      ))

      const button = wrapper.findComponent(JButton)

      expect(button.classes()).toContain('j-button')

      namespace.value = 'jr'
      await nextTick()

      expect(button.classes()).toContain('jr-button')
    })
  })
})
