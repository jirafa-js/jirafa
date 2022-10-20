import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import JTag from '../src/tag.vue'

const JIRAFA = 'J I R A FA'

describe('JTag.vue', () => {
  test('render text & class', () => {
    const wrapper = mount(() => <JTag>{JIRAFA}</JTag>)
    expect(wrapper.text()).toEqual(JIRAFA)

    const vm = wrapper.vm

    expect(vm.$el.classList.contains('j-tag')).toEqual(true)
    expect(vm.$el.classList.contains('j-tag__close')).toEqual(false)
  })

  test('color', async () => {
    const color = ref('success')
    const wrapper = mount(() => <JTag color={color.value} />)
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('j-tag--success')).toEqual(true)
    color.value = '#ccc'
    await nextTick()
    expect(wrapper.attributes('style')).toContain('--j-tag-text-color: #ccc')
  })

  test('size', () => {
    const wrapper = mount(() => <JTag size="large" />)
    const vm = wrapper.vm
    const el = vm.$el
    expect(el.className.includes('j-tag--large')).toEqual(true)
    expect(el.className.includes('j-tag--mini')).toEqual(false)
    expect(el.className.includes('j-tag--small')).toEqual(false)
  })

  test('closable', async () => {
    const wrapper = mount(() => <JTag closable={true} />)
    const comp = wrapper.findComponent(JTag)
    const closeBtn = comp.find('.j-tag .j-tag__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(comp.emitted().close).toBeTruthy()
  })

  test('checkable', async () => {
    const checked = ref(false)
    const wrapper = mount(() => (
      <JTag checkable={true} v-model:checked={checked.value} />
    ))

    await wrapper.find('.j-tag').trigger('click')

    expect(checked.value).toBe(true)

    await wrapper.find('.j-tag').trigger('click')

    expect(checked.value).toBe(false)
  })

  test('border', () => {
    const wrapper = mount(() => <JTag border />)
    const vm = wrapper.vm
    expect(vm.$el.classList.contains('is-bordered')).toEqual(true)
  })
})
