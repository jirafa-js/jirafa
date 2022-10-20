import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import JRow from '../src/row.vue'
import JCol from '../src/col.vue'
import JGrid from '../src/grid.vue'
import JGridItem from '../src/grid-item.vue'

const JIRAFA = 'J I R A F A'

describe('JRow.vue', () => {
  test('create', () => {
    const wrapper = mount(() => <JRow />)
    expect(wrapper.classes()).toContain('j-row')
  })

  test('gutter', () => {
    const wrapper = mount(() => <JRow gutter={20} />)
    const rowElm = wrapper.element as HTMLElement
    expect(rowElm.style.marginInline).toEqual('-10px')
  })
  test('justify', () => {
    const wrapper = mount(() => <JRow justify="end" />)
    expect(wrapper.classes()).toContain('is-justify-end')
  })
  test('align', () => {
    const wrapper = mount(() => <JRow align="end" />)
    expect(wrapper.classes()).toContain('is-align-end')
  })
})

describe('JCol.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <JCol />)
    expect(wrapper.classes()).toContain('j-col')
  })

  it('span', () => {
    const wrapper = mount(() => <JCol span={12} />)
    expect(wrapper.classes()).toContain('j-col-12')
  })

  it('pull', () => {
    const wrapper = mount(() => <JCol span={12} pull={3} />)
    expect(wrapper.classes()).toContain('j-col-pull-3')
  })

  it('push', () => {
    const wrapper = mount(() => <JCol span={12} push={3} />)
    expect(wrapper.classes()).toContain('j-col-push-3')
  })

  it('gutter', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <JRow gutter={20}>
            <JCol span={12} ref="col"></JCol>
          </JRow>
        )
      },
    })

    const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement
    expect(colElm.style.paddingInline === '10px').toBe(true)
  })

  it('change gutter value', async () => {
    const outer = ref(20)

    const wrapper = mount({
      setup() {
        return () => (
          <JRow gutter={outer.value} ref="row">
            <JCol span={12} ref="col" />
          </JRow>
        )
      },
    })

    const rowElm = wrapper.findComponent({ ref: 'row' }).element as HTMLElement
    const colElm = wrapper.findComponent({ ref: 'col' }).element as HTMLElement
    expect(rowElm.style.marginInline).toBe('-10px')
    expect(colElm.style.paddingInline).toBe('10px')

    outer.value = 40 // change gutter value
    await nextTick()
    expect(rowElm.style.marginInline).toBe('-20px')
    expect(colElm.style.paddingInline).toBe('20px')
  })

  it('responsive', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <JRow gutter={20}>
            <JCol
              ref="col"
              sm={{ span: 4, offset: 2 }}
              md={8}
              lg={{ span: 6, offset: 3 }}
            />
          </JRow>
        )
      },
    })

    const colElmClass = wrapper.findComponent({ ref: 'col' }).classes()
    expect(colElmClass.includes('j-col-sm-4')).toBe(true)
    expect(colElmClass.includes('j-col-sm-4')).toBe(true)
    expect(colElmClass.includes('j-col-sm-offset-2')).toBe(true)
    expect(colElmClass.includes('j-col-lg-6')).toBe(true)
    expect(colElmClass.includes('j-col-lg-offset-3')).toBe(true)
    expect(colElmClass.includes('j-col-md-8')).toBe(true)
  })
})

describe('JGrid.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <JGrid />)
    expect(wrapper.classes()).toContain('j-grid')
  })

  it('cols', async () => {
    const cols = ref(12)
    const wrapper = mount(() => <JGrid cols={cols.value} />)
    expect(wrapper.find('.j-grid').attributes('style')).toContain(
      'grid-template-columns: repeat(12, minmax(0, 1fr)'
    )

    // Todo deal with going error
    // cols.value = 8
    // await nextTick()
    // expect(wrapper.find('.j-grid').attributes('style')).toContain(
    //   'grid-template-columns: repeat(8, minmax(0, 1fr)'
    // )
  })

  it('gap', async () => {
    const gap = ref<number | [number, number]>(12)
    const wrapper = mount(() => <JGrid gap={gap.value} />)
    expect(wrapper.attributes('style')).toContain('gap: 12px 12px')

    // Todo
    // gap.value = 4
    // await nextTick()
    // expect(wrapper.attributes('style')).toContain('gap: 4px 10px')
  })
})

describe('JGridItem.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <JGridItem>{JIRAFA}</JGridItem>)
    expect(wrapper.classes()).toContain('j-grid-item')
    expect(wrapper.text()).toContain(JIRAFA)
  })

  it('span', () => {
    const wrapper = mount(() => <JGridItem span={12} />)
    expect(wrapper.attributes('style')).toContain(
      'grid-column: span 12 / span 12'
    )
  })

  // Todo
  // it('offset', () => {
  //   const wrapper = mount(() => <JGridItem offset={3}></JGridItem>)

  //   const item = wrapper.findComponent(JGridItem)
  //   expect(item.props('offset')).toBe(
  //     'margin-left: calc(((100% - 0px) / 4) * 3 + 0px)'
  //   )
  // })

  // Todo
  // it('gap', () => {
  //   const wrapper = mount({
  //     setup() {
  //       return () => (
  //         <JGrid gap={20}>
  //           <JGridItem offset={3}></JGridItem>
  //         </JGrid>
  //       )
  //     },
  //   })

  //   const item = wrapper.find('.j-grid-item').element as HTMLDivElement
  //   expect(item.style).toBe('margin-left: calc(((100% - 60px) / 4) * 3 + 60px)')
  // })

  it('span over cols', async () => {
    const span = ref(5)
    const wrapper = mount({
      setup() {
        return () => (
          <JGrid cols={3}>
            <JGridItem span={span.value}></JGridItem>
          </JGrid>
        )
      },
    })

    expect(wrapper.find('.j-grid-item').attributes('style')).toContain(
      'grid-column: span 3 / span 3'
    )

    span.value = 2
    await nextTick()
    expect(wrapper.find('.j-grid-item').attributes('style')).toContain(
      'grid-column: span 2 / span 2'
    )
  })
})
