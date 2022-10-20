import { markRaw, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Loading, Search } from '@jirafa/icons'
import JButton from '../src/button.vue'
import JButtonGroup from '../src/button-group.vue'
import type { ButtonProps } from '../src/button'

const JIRAFA = 'J I R A FA'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <JButton type="primary" />)

    expect(wrapper.classes()).toContain('j-button--primary')
  })

  it('icon', () => {
    const wrapper = mount(() => <JButton icon={markRaw(Search)} />)

    expect(wrapper.findComponent(Search).exists()).toBeTruthy()
  })

  it('nativeType', () => {
    const wrapper = mount(() => <JButton htmlType="submit" />)

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('loading', () => {
    const wrapper = mount(() => <JButton loading />)

    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.findComponent(Loading).exists()).toBeTruthy()
  })

  it('size', () => {
    const wrapper = mount(() => <JButton size="large" />)

    expect(wrapper.classes()).toContain('j-button--large')
  })

  it('status', () => {
    const wrapper = mount(() => <JButton status="success" />)

    expect(wrapper.classes()).toContain('j-button--success')
  })

  it('shape', () => {
    const wrapper = mount(() => <JButton shape="round" />)
    expect(wrapper.classes()).toContain('j-button--round')
  })

  test('render text', () => {
    const wrapper = mount(() => (
      <JButton
        v-slots={{
          default: () => JIRAFA,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(JIRAFA)
  })

  test('handle click', async () => {
    const wrapper = mount(() => (
      <JButton
        v-slots={{
          default: () => JIRAFA,
        }}
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('handle click inside', async () => {
    const wrapper = mount(() => (
      <JButton
        v-slots={{
          default: () => <span class="inner-slot"></span>,
        }}
      />
    ))

    wrapper.find('.inner-slot').trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('loading implies disabled', async () => {
    const wrapper = mount(() => (
      <JButton
        v-slots={{
          default: () => JIRAFA,
        }}
        loading
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disabled', async () => {
    const wrapper = mount(() => <JButton disabled />)

    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('loading icon', () => {
    const wrapper = mount(() => (
      <JButton loadingIcon={markRaw(Search)} loading />
    ))

    expect(wrapper.findComponent(Search).exists()).toBeTruthy()
  })

  it('loading slot', () => {
    const wrapper = mount({
      setup: () => () =>
        (
          <JButton
            v-slots={{
              loading: () => <span class="custom-loading">custom-loading</span>,
            }}
            loading={true}
          >
            Loading
          </JButton>
        ),
    })

    expect(wrapper.find('.custom-loading').exists()).toBeTruthy()
  })
})
describe('Button Group', () => {
  it('button group reactive type', async () => {
    const type = ref<ButtonProps['type']>('secondary')
    const wrapper = mount({
      setup: () => () =>
        (
          <JButtonGroup type={type.value}>
            <JButton type="text">Prev</JButton>
            <JButton>Next</JButton>
          </JButtonGroup>
        ),
    })
    expect(wrapper.classes()).toContain('j-button-group')
    expect(
      wrapper.findAll('.j-button-group button.j-button--secondary').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--text').length
    ).toBe(1)

    type.value = 'primary'
    await nextTick()

    expect(
      wrapper.findAll('.j-button-group button.j-button--primary').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--text').length
    ).toBe(1)
  })

  it('button group reactive size', async () => {
    const size = ref<ButtonProps['size']>('small')
    const wrapper = mount({
      setup: () => () =>
        (
          <JButtonGroup size={size.value}>
            <JButton size="mini">Prev</JButton>
            <JButton>Next</JButton>
          </JButtonGroup>
        ),
    })
    expect(wrapper.classes()).toContain('j-button-group')
    expect(
      wrapper.findAll('.j-button-group button.j-button--small').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--mini').length
    ).toBe(1)

    size.value = 'large'
    await nextTick()

    expect(
      wrapper.findAll('.j-button-group button.j-button--large').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--mini').length
    ).toBe(1)
  })

  it('button group reactive status', async () => {
    const status = ref<ButtonProps['status']>('warning')
    const wrapper = mount({
      setup: () => () =>
        (
          <JButtonGroup status={status.value}>
            <JButton status="success">Prev</JButton>
            <JButton>Next</JButton>
          </JButtonGroup>
        ),
    })
    expect(wrapper.classes()).toContain('j-button-group')
    expect(
      wrapper.findAll('.j-button-group button.j-button--success').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--warning').length
    ).toBe(1)

    status.value = 'danger'
    await nextTick()
    expect(
      wrapper.findAll('.j-button-group button.j-button--success').length
    ).toBe(1)
    expect(
      wrapper.findAll('.j-button-group button.j-button--danger').length
    ).toBe(1)
  })

  it('button group disabled', () => {
    const wrapper = mount({
      setup: () => () =>
        (
          <JButtonGroup disabled>
            <JButton disabled={false}>Prev</JButton>
            <JButton>Next</JButton>
          </JButtonGroup>
        ),
    })
    expect(wrapper.classes()).toContain('j-button-group')
    expect(wrapper.findAll('.j-button-group button.is-disabled').length).toBe(2)
  })
})
