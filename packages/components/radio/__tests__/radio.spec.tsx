import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import type { RadioProps } from '@jirafa/jirafa'
import JRadio from '../src/radio.vue'
import JRadioGroup from '../src/radio-group.vue'

describe('JRadio.vue', () => {
  it('create', async () => {
    const handleChange = vi.fn()
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadio v-model={radio.value} value="a" onChange={handleChange} />
    ))

    expect(wrapper.text()).toEqual('a')
    expect(wrapper.classes()).toContain('j-radio')
    await wrapper.trigger('click')

    expect(radio.value).toEqual(`a`)
    expect(handleChange).toBeCalledTimes(1)
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('size', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadio v-model={radio.value} value="a" size="mini" />
    ))

    expect(wrapper.text()).toEqual('a')
    expect(wrapper.classes()).toContain('j-radio--mini')
  })

  it('disabled', async () => {
    const handleChange = vi.fn()
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadio
        v-model={radio.value}
        value="a"
        disabled
        onChange={handleChange}
      />
    ))

    expect(wrapper.text()).toEqual('a')
    expect(wrapper.classes()).toContain('j-radio')
    await wrapper.trigger('click')

    expect(radio.value).toEqual(``)
    expect(handleChange).toBeCalledTimes(0)
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('border', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadio v-model={radio.value} value="a" border />
    ))

    expect(wrapper.text()).toEqual('a')
    expect(wrapper.classes()).toContain('is-bordered')
  })

  it('change event', async () => {
    const radio = ref('')
    const changeData = ref<RadioProps['modelValue']>('')
    const handleChange = (val: RadioProps['modelValue']) => {
      changeData.value = val
    }
    const wrapper = mount(() => (
      <JRadio v-model={radio.value} value="a" onChange={handleChange} />
    ))

    await wrapper.trigger('click')
    expect(changeData.value).toEqual('a')
  })

  it('change event only triggers on user input', async () => {
    const radio = ref('')
    const changeData = ref<RadioProps['modelValue']>('')
    const handleChange = (val: RadioProps['modelValue']) => {
      changeData.value = val
    }
    mount(() => (
      <JRadio v-model={radio.value} value="a" onChange={handleChange} />
    ))

    radio.value = 'b'
    await nextTick()
    expect(changeData.value).toEqual('')
    expect(radio.value).toEqual('b')
  })
})

describe('JRadioGroup.vue', () => {
  it('create', async () => {
    const radio = ref('a')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value}>
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    const [radio1, radio2] = wrapper.findAllComponents(JRadio)
    expect(radio1.classes()).toContain('is-checked')
    await radio2.trigger('click')
    expect(radio2.classes()).toContain('is-checked')
    expect(radio.value).toEqual('b')
    expect(wrapper.attributes().role).toBe('radiogroup')
  })

  it('size', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} size="large">
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    expect(wrapper.findAll('.j-radio.j-radio--large').length).toBe(2)
  })

  it('disabled', async () => {
    const radio = ref('a')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} disabled>
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    expect(wrapper.findAll('.j-radio.is-disabled').length).toBe(2)

    const [radio1, radio2] = wrapper.findAllComponents(JRadio)
    expect(radio1.classes()).toContain('is-checked')
    await radio2.trigger('click')
    expect(radio1.classes()).toContain('is-checked')
    expect(radio.value).toEqual('a')
  })

  it('border', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} border>
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    expect(wrapper.findAll('.j-radio.is-bordered').length).toBe(2)
  })

  it('change event', async () => {
    const radio = ref('')
    const changeData = ref<RadioProps['modelValue']>('')
    const handleChange = (val: RadioProps['modelValue']) => {
      changeData.value = val
    }
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} onChange={handleChange}>
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    const radio2 = wrapper.findAllComponents(JRadio).at(1)
    await radio2?.trigger('click')
    expect(radio.value).toEqual('b')
    expect(changeData.value).toEqual('b')
  })

  it('change event only triggers on user input', async () => {
    const radio = ref('')
    const changeData = ref<RadioProps['modelValue']>('')
    const handleChange = (val: RadioProps['modelValue']) => {
      changeData.value = val
    }
    mount(() => (
      <JRadioGroup v-model={radio.value} onChange={handleChange}>
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    radio.value = 'b'
    await nextTick()
    expect(changeData.value).toEqual('')
    expect(radio.value).toEqual('b')
  })

  it('with disabled children', async () => {
    const radio = ref('')

    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value}>
        <JRadio value="a" />
        <JRadio value="b" disabled />
      </JRadioGroup>
    ))

    const [radio1, radio2] = wrapper.findAllComponents(JRadio)
    await radio2.trigger('click')
    expect(radio.value).toEqual('')
    await radio1.trigger('click')
    expect(radio.value).toEqual('a')
  })
})

describe('type button', () => {
  it('single radio', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadio v-model={radio.value} value="a" type="button" />
    ))

    expect(wrapper.text()).toEqual('a')
    expect(wrapper.classes()).toContain('j-radio-button')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('radio group', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} type="button">
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    expect(wrapper.findAll('.j-radio-button').length).toBe(2)
  })

  it('size', async () => {
    const radio = ref('')
    const wrapper = mount(() => (
      <JRadioGroup v-model={radio.value} size="large" type="button">
        <JRadio value="a" />
        <JRadio value="b" />
      </JRadioGroup>
    ))

    expect(
      wrapper.findAll('.j-radio-button.j-radio-button--large').length
    ).toBe(2)
  })
})

// describe('form ')
