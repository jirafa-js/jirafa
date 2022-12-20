import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import JInput from '@jirafa/components/input'
import { nextTick, reactive, ref } from 'vue'
import type {
  FormInstance,
  FormItemInstance,
  FormProps,
  FormRules,
} from '@jirafa/jirafa'
import JForm from '../src/form.vue'
import JFormItem from '../src/form-item.vue'

const findStyle = (wrapper: VueWrapper<any>, selector: string) =>
  wrapper.find<HTMLElement>(selector).element.style

const stylePlugin = (wrapper: any) => {
  return {
    style: wrapper.element.style,
  }
}

describe('JForm', () => {
  beforeAll(() => {
    config.plugins.DOMWrapper.install(stylePlugin)
    config.plugins.VueWrapper.install(stylePlugin)
  })

  it('label width', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
        })
        return () => (
          <JForm ref="form" model={form} labelWidth="80px">
            <JFormItem label="Name">
              <JInput v-model={form.name} />
            </JFormItem>
          </JForm>
        )
      },
    })
    expect(findStyle(wrapper, '.j-form-item__label-wrap').flex).toBe('0 0 80px')
  })

  it('auto label width', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          intro: '',
        })
        return () => (
          <JForm model={form} labelWidth="auto">
            <JFormItem label="Name Long">
              <JInput v-model={form.name} />
            </JFormItem>
            <JFormItem label="Intro">
              <JInput v-model={form.intro} />
            </JFormItem>
          </JForm>
        )
      },
    })

    await nextTick()

    const formItemLabelWraps = wrapper.findAll<HTMLElement>(
      '.j-form-item__label-wrap'
    )

    const flex = formItemLabelWraps[0].element.style.flex
    const flex1 = formItemLabelWraps[1].element.style.flex

    expect(flex).toEqual('') // jsdom not implemented getComputedStyle
    expect(flex).toEqual(flex1)
  })

  it('form-item auto label width', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          region: '',
          type: '',
        })
        return () => (
          <JForm
            ref="form"
            labelPosition="right"
            labelWidth="150px"
            model={form}
          >
            <JFormItem label="名称">
              <JInput v-model={form.name} />
            </JFormItem>
            <JFormItem label="活动区域" label-width="auto">
              <JInput v-model={form.region} />
            </JFormItem>
            <JFormItem
              label="活动形式(我是一个很长很长很长很长的label)"
              label-width="auto"
            >
              <JInput v-model={form.type} />
            </JFormItem>
          </JForm>
        )
      },
    })

    const formItemLabelWraps = wrapper.findAll<HTMLElement>(
      '.j-form-item__label-wrap'
    )

    const labelWrapFlex = formItemLabelWraps[0].element.style.flex
    const labelWrapFlex1 = formItemLabelWraps[1].element.style.flex
    const labelWrapFlex2 = formItemLabelWraps[2].element.style.flex
    expect(labelWrapFlex).toEqual('0 0 150px')
    expect(labelWrapFlex1).toEqual('')
    expect(labelWrapFlex1).toEqual(labelWrapFlex2)
  })

  it('layout', async () => {
    const layout = ref<FormProps['layout']>('horizontal')
    const form = reactive({
      name: '',
      address: '',
    })
    const wrapper = mount(() => (
      <JForm ref="form" model={form} layout={layout.value}>
        <JFormItem>
          <JInput v-model={form.name} />
        </JFormItem>
        <JFormItem>
          <JInput v-model={form.address} />
        </JFormItem>
      </JForm>
    ))
    expect(wrapper.classes()).toContain('j-form--horizontal')

    layout.value = 'vertical'
    await nextTick()

    expect(wrapper.classes()).toContain('j-form--vertical')

    layout.value = 'inline'
    await nextTick()

    expect(wrapper.classes()).toContain('j-form--inline')
  })

  it('label position', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: '',
        })
        return () => (
          <div>
            <JForm model={form} labelPosition="left" ref="labelLeft">
              <JFormItem>
                <JInput v-model={form.name} />
              </JFormItem>
              <JFormItem>
                <JInput v-model={form.address} />
              </JFormItem>
            </JForm>
            <JForm model={form} ref="labelRight">
              <JFormItem>
                <JInput v-model={form.name} />
              </JFormItem>
              <JFormItem>
                <JInput v-model={form.address} />
              </JFormItem>
            </JForm>
          </div>
        )
      },
    })

    expect(wrapper.findComponent(JForm).classes()).toContain(
      'j-form--label-left'
    )
    expect(wrapper.findComponent({ ref: 'labelRight' }).classes()).toContain(
      'j-form--label-right'
    )
  })

  it('form size', () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
        })
        return () => (
          <div>
            <JForm model={form} size="small" ref="labelSmall">
              <JFormItem>
                <JInput v-model={form.name} />
              </JFormItem>
            </JForm>
          </div>
        )
      },
    })
    expect(wrapper.findComponent(JFormItem).classes()).toContain(
      'j-form-item--small'
    )
  })

  it('show message', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
        })
        return () => (
          <JForm model={form} ref="form">
            <JFormItem
              label="Name"
              prop="name"
              showMessage={false}
              rules={{
                required: true,
                message: 'Please input name',
                trigger: 'change',
                min: 3,
                max: 6,
              }}
            >
              <JInput v-model={form.name} />
            </JFormItem>
          </JForm>
        )
      },
    })
    const form = wrapper.findComponent(JForm).vm as FormInstance

    vi.useFakeTimers()
    const valid = await form
      .validate()
      .then(() => true)
      .catch(() => false)
    vi.runAllTimers()
    vi.useRealTimers()

    await nextTick()
    expect(valid).toBe(false)
    expect(wrapper.find('.el-form-item.is-error').exists()).toBe(false)
  })

  it('reset field', async () => {
    vi.useFakeTimers()
    const form = reactive({
      name: '',
      address: '',
      type: new Array<string>(),
    })

    const wrapper = mount({
      setup() {
        const rules: FormRules = {
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change',
            },
          ],
        }
        return () => (
          <JForm ref="form" model={form} rules={rules}>
            <JFormItem label="name" prop="name">
              <JInput v-model={form.name} ref="fieldName" />
            </JFormItem>
            <JFormItem label="address" prop="address">
              <JInput v-model={form.address} ref="fieldAddr" />
            </JFormItem>
            {/* <JFormItem label="type" prop="type">
              <CheckboxGroup v-model={form.type}>
                <Checkbox label="type1" name="type" />
                <Checkbox label="type2" name="type" />
                <Checkbox label="type3" name="type" />
                <Checkbox label="type4" name="type" />
              </CheckboxGroup>
            </JFormItem> */}
          </JForm>
        )
      },
    })

    form.name = 'jack'
    form.address = 'aaaa'
    form.type.push('type1')

    const formRef = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    formRef.resetFields()
    // first await waits for the validation to be dispatched.
    await nextTick()
    // after validation dispatched, it will update `validateStateDebounced` with a 100ms delay.
    // That's why we put this `vi.runAllTimers` here.
    vi.runAllTimers()
    // after timer fired, we should wait for the UI to be updated.
    await nextTick()
    expect(form.name).toBe('')
    expect(form.address).toBe('')
    // expect(form.type.length).toBe(0)
    expect(wrapper.findAll('.el-form-item__error')).toHaveLength(0)
    vi.useRealTimers()
  })

  it('clear validate', async () => {
    const wrapper = mount({
      setup() {
        const form = reactive({
          name: '',
          address: '',
          type: [],
        })

        const rules: FormRules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
          ],
          address: [
            {
              required: true,
              message: 'Please input address',
              trigger: 'change',
            },
          ],
          type: [
            {
              type: 'array',
              required: true,
              message: 'Please input type',
              trigger: 'change',
            },
          ],
        })

        return () => (
          <JForm ref="form" model={form} rules={rules}>
            <JFormItem label="name" prop="name" ref="name">
              <JInput v-model={form.name} />
            </JFormItem>
            <JFormItem label="address" prop="address" ref="address">
              <JInput v-model={form.address} />
            </JFormItem>
            {/* <JFormItem label="type" prop="type">
              <CheckboxGroup v-model={form.type}>
                <Checkbox label="type1" name="type" />
                <Checkbox label="type2" name="type" />
                <Checkbox label="type3" name="type" />
                <Checkbox label="type4" name="type" />
              </CheckboxGroup>
            </JFormItem> */}
          </JForm>
        )
      },
    })

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    const nameField = wrapper.findComponent({ ref: 'name' })
      .vm as FormItemInstance
    const addressField = wrapper.findComponent({ ref: 'address' })
      .vm as FormItemInstance
    await form.validate().catch(() => undefined)
    await nextTick()
    expect(nameField.validateMessage).toBe('Please input name')
    expect(addressField.validateMessage).toBe('Please input address')
    form.clearValidate(['name'])
    await nextTick()
    expect(nameField.validateMessage).toBe('')
    expect(addressField.validateMessage).toBe('Please input address')
    form.clearValidate()
    await nextTick()
    expect(addressField.validateMessage).toBe('')
  })

  it('scroll to field', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <JForm ref="form">
              <JFormItem prop="name" ref="formItem">
                <JInput />
              </JFormItem>
            </JForm>
          </div>
        )
      },
    })

    const oldScrollIntoView = window.HTMLElement.prototype.scrollIntoView

    const scrollIntoViewMock = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = function () {
      scrollIntoViewMock(this)
    }

    const form = wrapper.findComponent({ ref: 'form' }).vm as FormInstance
    form.scrollToField('name')
    expect(scrollIntoViewMock).toHaveBeenCalledWith(
      wrapper.findComponent({ ref: 'formItem' }).element
    )

    window.HTMLElement.prototype.scrollIntoView = oldScrollIntoView
  })

  it('validate return parameters', async () => {
    const form = reactive({
      name: 'test',
      age: '',
    })

    const wrapper = mount({
      setup() {
        const rules = reactive({
          name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
          ],
          age: [
            { required: true, message: 'Please input age', trigger: 'blur' },
          ],
        })
        return () => (
          <JForm
            ref="formRef"
            model={form}
            rules={rules}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onSubmit="return false"
          >
            <JFormItem prop="name" label="name">
              <JInput v-model={form.name} />
            </JFormItem>
            <JFormItem prop="age" label="age">
              <JInput v-model={form.age} />
            </JFormItem>
          </JForm>
        )
      },
    })
    const vm = wrapper.vm

    async function validate() {
      return (vm.$refs.formRef as FormInstance)
        .validate()
        .then(() => ({ valid: true, fields: undefined }))
        .catch((fields) => ({ valid: false, fields }))
    }

    let res = await validate()
    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(1)
    form.name = ''
    await nextTick()

    res = await validate()
    expect(res.valid).toBe(false)
    expect(Object.keys(res.fields).length).toBe(2)

    form.name = 'test'
    form.age = 'age'
    await nextTick()
    res = await validate()
    expect(res.valid).toBe(true)
    expect(res.fields).toBe(undefined)
  })

  it('validate status', async () => {
    const form = reactive({
      age: '20',
    })

    const wrapper = mount({
      setup() {
        const rules = ref({
          age: [
            { required: true, message: 'Please input age', trigger: 'change' },
          ],
        })
        return () => (
          <JForm ref="formRef" model={form} rules={rules.value}>
            <JFormItem ref="age" prop="age" label="age">
              <JInput v-model={form.age} />
            </JFormItem>
          </JForm>
        )
      },
    })

    await (wrapper.vm.$refs.formRef as FormInstance)
      .validate()
      .catch(() => undefined)
    const ageField = wrapper.findComponent({ ref: 'age' })
    expect(ageField.classes('is-success')).toBe(true)
    expect(ageField.classes()).toContain('is-success')
  })

  // describe('JFormItem', () => {
  //   const onSuccess = vi.fn()
  //   const onError = vi.fn()
  //   let wrapper: VueWrapper<InstanceType<typeof DynamicDomainForm>>
  //   const createComponent = (onSubmit?: vi.MockedFunction<any>) => {
  //     wrapper = mount(DynamicDomainForm, {
  //       props: {
  //         onSuccess,
  //         onError,
  //         onSubmit,
  //       },
  //     })
  //   }

  //   const findSubmitButton = () => wrapper.find('.submit')
  //   const findAddDomainButton = () => wrapper.find('.add-domain')
  //   const findDeleteDomainButton = () => wrapper.findAll('.delete-domain')
  //   const findDomainItems = () => wrapper.findAll('.domain-item')

  //   beforeEach(() => {
  //     createComponent()
  //   })

  //   afterEach(() => {
  //     wrapper.unmount()
  //   })

  //   it('should register form item', async () => {
  //     expect(findDomainItems()).toHaveLength(1)
  //     await findSubmitButton().trigger('click')
  //     // wait for AsyncValidator to be resolved
  //     await rAF()
  //     expect(onError).toHaveBeenCalled()
  //   })

  //   it('should dynamically register form with items', async () => {
  //     await findAddDomainButton().trigger('click')
  //     expect(findDomainItems()).toHaveLength(2)

  //     await findSubmitButton().trigger('click')
  //     // wait for AsyncValidator to be resolved
  //     await rAF()
  //     expect(onError).toHaveBeenCalledWith(formatDomainError(2))
  //     const deleteBtns = findDeleteDomainButton()
  //     expect(deleteBtns).toHaveLength(2)
  //     await findDeleteDomainButton().at(1)!.trigger('click')
  //     expect(findDomainItems()).toHaveLength(1)
  //     await findSubmitButton().trigger('click')
  //     // wait for AsyncValidator to be resolved
  //     await rAF()
  //     expect(onError).toHaveBeenLastCalledWith(formatDomainError(1))
  //   })

  //   it('should not throw error when callback passed in', async () => {
  //     const onSubmit = vi.fn()
  //     createComponent(onSubmit)

  //     await findSubmitButton().trigger('click')
  //     await rAF()
  //     expect(onError).not.toHaveBeenCalled()
  //     expect(onSubmit).toHaveBeenCalled()
  //   })
  // })
})
