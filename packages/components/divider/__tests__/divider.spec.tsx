import { mount } from '@vue/test-utils'
import JDivider from '../src/divider.vue'

const JIRAFA = 'J I R A F A'

describe('JDivider.vue', () => {
  it('render test', () => {
    const wrapper = mount(() => <JDivider v-slots={{ default: JIRAFA }} />)

    expect(wrapper.text()).toEqual(JIRAFA)
  })

  it('direction', () => {
    const wrapper = mount(() => <JDivider direction={'vertical'} />)
    expect(wrapper.classes()).toContain('j-divider--vertical')
  })

  it('orientation', () => {
    const wrapper = mount(() => (
      <JDivider orientation={'right'} v-slots={{ default: JIRAFA }} />
    ))

    expect(wrapper.find('.j-divider__text').classes()).toContain('is-right')
  })

  it('customClass', () => {
    const wrapper = mount(() => <JDivider className="customClass" />)
    expect(wrapper.classes()).toContain('customClass')
  })

  it('type-dashed', () => {
    const wrapper = mount(() => <JDivider type={'dashed'} />)
    expect(
      getComputedStyle(wrapper.element, null).getPropertyValue(
        '--j-divider-border-style'
      )
    ).toBe('dashed')
  })

  it('space-12', () => {
    const wrapper = mount(() => <JDivider space={12} />)
    expect(
      getComputedStyle(wrapper.element, null).getPropertyValue(
        '--j-divider-space'
      )
    ).toBe('12px')
  })

  it('space-mini', () => {
    const wrapper = mount(() => <JDivider space={'mini'} />)
    expect(
      getComputedStyle(wrapper.element, null).getPropertyValue(
        '--j-divider-space'
      )
    ).toBe('4px')
  })
})
