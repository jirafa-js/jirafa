import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Search } from '@jirafa/icons'
import type { InputProps } from '@jirafa/jirafa'
import JInput from '../src/input.vue'

describe('JInput.vue', () => {
  test('create', async () => {
    const input = ref('input')
    const handleFocus = vi.fn()
    const wrapper = mount(() => (
      <JInput
        minlength={3}
        maxlength={5}
        placeholder="请输入内容"
        onFocus={handleFocus}
        modelValue={input.value}
      />
    ))

    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element

    await inputElm.trigger('focus')

    expect(inputElm.exists()).toBe(true)
    expect(handleFocus).toHaveBeenCalled()
    expect(nativeInput.placeholder).toMatchInlineSnapshot(`"请输入内容"`)
    expect(nativeInput.value).toMatchInlineSnapshot(`"input"`)
    expect(nativeInput.minLength).toMatchInlineSnapshot(`3`)
    expect(nativeInput.maxLength).toMatchInlineSnapshot(`5`)

    input.value = 'text'
    await nextTick()
    expect(inputElm.element.value).toMatchInlineSnapshot(`"text"`)
  })

  test('default to empty', () => {
    const wrapper = mount(() => <JInput />)
    const inputElm = wrapper.find('input')
    expect(inputElm.element.value).toBe('')
  })

  test('disabled', () => {
    const wrapper = mount(() => <JInput disabled />)
    const inputElm = wrapper.find('input')
    expect(inputElm.element.disabled).not.toBeNull()
  })

  test('input should minimize value between emoji length and maxLength', async () => {
    const inputVal = ref('12🌚')
    const wrapper = mount(() => (
      <JInput
        class="test-exceed"
        maxlength="4"
        showWordLimit
        v-model={inputVal.value}
      />
    ))
    const inputElm = wrapper.find('input')
    const nativeInput = inputElm.element
    const wrapperElm = wrapper.find('.j-input__wrapper').element
    expect(nativeInput.value).toMatchInlineSnapshot(`"12🌚"`)

    const elCount = wrapper.find('.j-input__count')
    expect(elCount.exists()).toBe(true)
    expect(elCount.text()).toMatchInlineSnapshot(`"3 / 4"`)

    inputVal.value = '1👌3😄'
    await nextTick()
    expect(nativeInput.value).toMatchInlineSnapshot(`"1👌3😄"`)
    expect(elCount.text()).toMatchInlineSnapshot(`"4 / 4"`)

    inputVal.value = '哈哈1👌3😄'
    await nextTick()
    expect(nativeInput.value).toMatchInlineSnapshot(`"哈哈1👌3😄"`)
    expect(elCount.text()).toMatchInlineSnapshot(`"6 / 4"`)
    expect(Array.from(wrapperElm.classList)).toMatchInlineSnapshot(`
      [
        "j-input__wrapper",
        "is-exceed",
      ]
    `)
  })

  test('suffixIcon', () => {
    const wrapper = mount(() => <JInput suffix-icon={Search} />)
    const icon = wrapper.find('.j-input__icon')
    expect(icon.exists()).toBe(true)
  })

  test('prefixIcon', () => {
    const wrapper = mount(() => <JInput prefix-icon={Search} />)
    const icon = wrapper.find('.j-input__icon')
    expect(icon.exists()).toBe(true)
  })

  test('size', () => {
    const wrapper = mount(() => <JInput size="large" />)
    expect(wrapper.classes('j-input--large')).toBe(true)
  })

  test('type', async () => {
    const type = ref<InputProps['type']>('text')
    const val = ref('123')

    const wrapper = mount(() => (
      <JInput type={type.value} v-model={val.value} />
    ))
    expect(wrapper.find('input').element.value).toMatchInlineSnapshot(`"123"`)

    type.value = 'password'
    await nextTick()
    await nextTick()

    expect(wrapper.find('input').element.value).toMatchInlineSnapshot(`"123"`)
  })

  test('limit input and show word count', async () => {
    const input1 = ref('')
    const input2 = ref('')
    const input3 = ref('exceed')
    const show = ref(false)

    const wrapper = mount(() => (
      <div>
        <JInput
          class="test-text"
          type="text"
          v-model={input1.value}
          maxlength="10"
          showWordLimit={show.value}
        />
        <JInput
          class="test-password"
          type="password"
          v-model={input2.value}
          maxlength="10"
          showWordLimit
        />
        <JInput
          class="test-initial-exceed"
          type="text"
          v-model={input3.value}
          maxlength="2"
          showWordLimit
        />
      </div>
    ))

    const inputElm1 = wrapper.vm.$el.querySelector('.test-text')
    const inputElm2 = wrapper.vm.$el.querySelector('.test-password')
    const wrapperElm = wrapper.vm.$el
      .querySelector('.test-initial-exceed')
      .querySelector('.j-input__wrapper')

    expect(inputElm1.querySelectorAll('.j-input__count').length).toEqual(0)
    expect(inputElm2.querySelectorAll('.j-input__count').length).toEqual(0)
    expect(Array.from(wrapperElm.classList)).toMatchInlineSnapshot(`
      [
        "j-input__wrapper",
        "is-exceed",
      ]
    `)

    show.value = true
    await nextTick()
    expect(inputElm1.querySelectorAll('.j-input__count').length).toEqual(1)

    input3.value = '1'
    await nextTick()
    expect(Array.from(wrapperElm.classList)).toMatchInlineSnapshot(`
      [
        "j-input__wrapper",
      ]
    `)
  })

  describe('Input Methods', () => {
    test('method:select', async () => {
      const testContent = ref('test')
      const wrapper = mount(() => <JInput v-model={testContent.value} />)

      const input = wrapper.find('input').element

      expect(input.selectionStart).toEqual(testContent.value.length)
      expect(input.selectionEnd).toEqual(testContent.value.length)

      input.select()
      await nextTick()
      expect(input.selectionStart).toEqual(0)
      expect(input.selectionEnd).toEqual(testContent.value.length)
    })
  })

  describe('Input Events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    test('event:focus & blur', async () => {
      const content = ref('')
      const wrapper = mount(() => (
        <JInput
          placeholder="请输入内容"
          modelValue={content.value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ))

      const input = wrapper.find('input')

      await input.trigger('focus')
      expect(handleFocus).toBeCalled()

      await input.trigger('blur')
      expect(handleBlur).toBeCalled()
    })

    test('event:change', async () => {
      const content = ref('a')
      const value = ref('')

      const handleChange = (val: string) => {
        value.value = val
      }

      // NOTE: should be same as native's change behavior
      const wrapper = mount(() => (
        <JInput
          placeholder="请输入内容"
          modelValue={content.value}
          onChange={handleChange}
        />
      ))

      const el = wrapper.find('input').element
      const simulateEvent = (text: string, event: string) => {
        el.value = text
        el.dispatchEvent(new Event(event))
      }

      // simplified test, component should emit change when native does
      simulateEvent('2', 'change')
      await nextTick()
      expect(value.value).toBe('2')
      simulateEvent('1', 'input')
      await nextTick()
      expect(value.value).toBe('2')
    })

    test('event:clear', async () => {
      const handleClear = vi.fn()
      const handleInput = vi.fn()
      const content = ref('a')

      const wrapper = mount(() => (
        <JInput
          placeholder="请输入内容"
          clearable
          v-model={content.value}
          onClear={handleClear}
          onInput={handleInput}
        />
      ))

      const input = wrapper.find('input')
      const vm = wrapper.vm
      // focus to show clear button
      await input.trigger('focus')
      await nextTick()
      vm.$el.querySelector('.j-input__clear').click()
      await nextTick()
      expect(content.value).toEqual('')
      expect(handleClear).toBeCalled()
      expect(handleInput).toBeCalled()
    })

    test('event:input', async () => {
      const handleInput = vi.fn()
      const content = ref('a')
      const wrapper = mount(() => (
        <JInput
          placeholder="请输入内容"
          clearable
          modelValue={content.value}
          onInput={handleInput}
        />
      ))
      const inputWrapper = wrapper.find('input')
      const nativeInput = inputWrapper.element
      nativeInput.value = '1'
      await inputWrapper.trigger('compositionstart')
      await inputWrapper.trigger('input')
      expect(handleInput).toBeCalledTimes(0)
      expect(content.value).toEqual('a')
      nativeInput.value = '2'
      await inputWrapper.trigger('compositionupdate')
      await inputWrapper.trigger('input')
      await inputWrapper.trigger('compositionend')
      expect(handleInput).toBeCalledTimes(1)
      // native input value is controlled
      expect(content.value).toEqual('a')
      expect(nativeInput.value).toEqual('a')
    })
  })

  test('non-emit event such as keyup should work', async () => {
    const handleKeyup = vi.fn()
    const wrapper = mount(() => <JInput onkeyup={handleKeyup} />)

    await wrapper.find('input').trigger('keyup')
    expect(handleKeyup).toBeCalledTimes(1)
  })

  test('container-attrs', () => {
    const wrapper = mount(() => (
      <JInput
        placeholder="请输入内容"
        container-attrs={{ style: { color: 'red' } }}
      />
    ))

    expect(wrapper.vm.$el.style.color === 'red').toBeTruthy()
  })

  test('input-style', () => {
    const wrapper = mount(() => (
      <JInput placeholder="请输入内容" input-style={{ color: 'red' }} />
    ))

    const input = wrapper.find('input')
    expect(input.element.style.color === 'red').toBeTruthy()
  })

  test('show-password icon', async () => {
    const password = ref('123456')
    const wrapper = mount(() => (
      <JInput type="password" modelValue={password.value} show-password />
    ))

    const icon = wrapper.find('.j-input__icon.j-input__password')
    const d = icon.find('path').element.getAttribute('d')
    await icon.trigger('click')
    const d0 = icon.find('path').element.getAttribute('d')
    expect(d !== d0).toBeTruthy()
  })
})
