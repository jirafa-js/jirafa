import type { VNode } from 'vue'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import type { SpaceProps } from '../src/space'
import JSpace from '../src/space'

const JIRAFA = 'J I R A F A'

describe('JJSpace.vue', () => {
  it('render test', async () => {
    const props = ref({})
    const wrapper = mount(() => <JSpace {...props.value}>{JIRAFA}</JSpace>)

    expect(wrapper.text()).toEqual(JIRAFA)

    props.value = {
      direction: 'vertical',
      wrap: true,
    }
    await nextTick()

    expect(wrapper.find('.j-space--vertical').exists()).toBe(true)
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'flex-wrap: wrap'
    )
  })

  it('gutter', async () => {
    const warnHandler = vi.fn()
    const gutter = ref<SpaceProps['gutter']>('large')
    const wrapper = mount(
      () => (
        <JSpace gutter={gutter.value}>
          {Array.from({ length: 2 }).map((_, idx) => {
            return <span>{`test${idx}`}</span>
          })}
        </JSpace>
      ),
      {
        global: {
          config: {
            warnHandler,
          },
        },
      }
    )

    await nextTick()
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'row-gap: 24px'
    )

    gutter.value = 30
    await nextTick()
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'row-gap: 30px'
    )

    gutter.value = [10, 20]
    await nextTick()
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'column-gap: 10px'
    )
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'row-gap: 20px'
    )

    // @ts-expect-error error
    gutter.value = 'unknown'
    await nextTick()

    expect(warnHandler).toHaveBeenCalled()

    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'row-gap: 16px'
    )
  })

  it('should render with spacer', async () => {
    const spacer = ref<string | VNode>('|')
    const wrapper = mount(() => (
      <JSpace gutter="large" spacer={spacer.value}>
        {Array.from({ length: 2 }).map((_, idx) => {
          return <span>{`test${idx}`}</span>
        })}
      </JSpace>
    ))

    await nextTick()
    expect(wrapper.element.children).toHaveLength(3)

    expect(wrapper.text()).toContain(spacer.value)

    // 2 elements expecting only 1 spacer
    expect(wrapper.text().split(spacer.value as string)).toHaveLength(2)
    const testJSpacerCls = 'test-spacer-cls'

    // vnode type spacer
    spacer.value = <span class={testJSpacerCls}>vnode </span>
    await nextTick()

    expect(wrapper.findAll(`.${testJSpacerCls}`)).toHaveLength(1)
    expect(wrapper.element.children).toHaveLength(3)
  })

  it('fill', async () => {
    const wrapper = mount(() => (
      <JSpace fill>
        {Array.from({ length: 2 }).map((_, idx) => {
          return <span>{`test${idx}`}</span>
        })}
      </JSpace>
    ))

    await nextTick()
    expect(wrapper.find('.j-space').attributes('style')).toContain(
      'flex-wrap: wrap'
    )
    expect(wrapper.find('.j-space').classes()).toContain('is-fill')
  })
})
