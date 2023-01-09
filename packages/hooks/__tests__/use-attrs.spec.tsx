import type { ComputedRef } from 'vue'
import { computed, defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useAttrs } from '..'

const genComp = (
  inheritAttrs = true,
  excludeListeners = false,
  excludeKeys?: ComputedRef<string[]>
) =>
  defineComponent({
    inheritAttrs,
    props: {} as Record<string, any>,
    setup() {
      const attrs = useAttrs({ excludeListeners, excludeKeys })
      return () => (
        <div>
          <span {...attrs.value}></span>
        </div>
      )
    },
  })

const CLASS = 'foo'
const WIDTH = '20px'
const TEST_KEY = 'test'
const TEST_VALUE = 'TEST_VALUE'
const TEST_ANOTHER_VALUE = 'TEST_ANOTHER_VALUE'
const handleClick = vi.fn()
const _mount = (Comp: ReturnType<typeof genComp>) =>
  mount({
    setup() {
      return () => (
        <Comp
          class={CLASS}
          style={{ width: WIDTH }}
          onClick={handleClick}
          {...{ [TEST_KEY]: TEST_VALUE }}
        />
      )
    },
  })

describe('useAttrs', () => {
  it('style and class should not bind to child node', async () => {
    const wrapper = _mount(genComp())

    const span = wrapper.find('span')
    const root = wrapper.element as HTMLDivElement

    expect(wrapper.classes()).toContain(CLASS)
    expect(root.style.width).toBe(WIDTH)
    expect(span.attributes(TEST_KEY)).toBe(TEST_VALUE)

    await span.trigger('click')
    expect(handleClick).toBeCalledTimes(2)
  })

  it('child node attributes should update when props change', async () => {
    const wrapper = _mount(genComp())

    const span = wrapper.find('span')
    await wrapper.setProps({ [TEST_KEY]: TEST_ANOTHER_VALUE })

    expect(span.attributes(TEST_KEY)).toBe(TEST_ANOTHER_VALUE)

    await span.trigger('click')
    expect(handleClick).toBeCalledTimes(2)
  })

  it('exclude listeners should not bind to child node', async () => {
    const wrapper = _mount(genComp(true, true))

    const span = wrapper.find('span')

    await span.trigger('click')
    expect(handleClick).toBeCalledTimes(1)
  })

  it('exclude attributes should not bind to child node', async () => {
    const wrapper = _mount(
      genComp(
        true,
        false,
        computed(() => [TEST_KEY])
      )
    )

    const span = wrapper.find('span')
    expect(span.attributes(TEST_KEY)).toBeUndefined()

    await span.trigger('click')
    expect(handleClick).toBeCalledTimes(2)
  })
})
