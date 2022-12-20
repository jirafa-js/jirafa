<script lang="ts" setup>
import type { FormInstance, FormItemInstance, FormRules } from '@jirafa/jirafa'
import { reactive, ref } from 'vue'
const form = reactive({ name: '', post: '', age: '', isRead: false })
const post = ref<FormItemInstance>()
const formComp = ref<FormInstance>()
const handleSubmit = async () => {
  // formComp.value?.validate((...args) => {
  //   console.log(...args)
  // })
}

const formRef2 = ref<FormInstance>()
const form2 = reactive({
  name: '',
  address: '',
  type: new Array<string>(),
})

const rules2: FormRules = {
  name: [{ required: true, message: 'Please input name' }],
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

const submit2 = () => {
  formRef2.value?.validate()
}

const reset2 = () => {
  formRef2.value?.resetFields()
}

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const rules = ref({
  age: [{ validator: checkAge, trigger: 'blur' }],
})
</script>

<template>
  <JForm
    ref="formComp"
    :model="form"
    :rules="rules"
    require-asterisk-position="right"
    label-width="auto"
    label-position="left"
    status-icon
    scroll-to-first-error
    @submit="handleSubmit"
  >
    <JFormItem
      label="Name"
      prop="name"
      :rules="[{ required: true, message: 'Name', trigger: 'change' }]"
    >
      <JInput
        v-model="form.name"
        placeholder="Please input your username"
        clearable
      ></JInput>
    </JFormItem>
    <JFormItem ref="post" label="Post" prop="post" required>
      <JInput v-model="form.post" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem label="Age" prop="age" help="age help">
      <JInput
        v-model.number="form.age"
        placeholder="Please input your post"
      ></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>

  <JForm ref="formRef2" label-width="auto" :model="form2" :rules="rules2">
    <JFormItem label="name" prop="name">
      <JInput ref="fieldName" v-model="form2.name" />
    </JFormItem>
    <JFormItem label="address" prop="address" extra="This is extra info.">
      <JInput ref="fieldAddr" v-model="form2.address" />
    </JFormItem>
    <JFormItem>
      <JButton type="primary" @click="submit2">Submit</JButton>
      <JButton @click="reset2">Reset</JButton>
    </JFormItem>
    <!-- {/*
    <JFormItem label="type" prop="type">
      <CheckboxGroup v-model="{form2.type}">
        <Checkbox label="type1" name="type" />
        <Checkbox label="type2" name="type" />
        <Checkbox label="type3" name="type" />
        <Checkbox label="type4" name="type" />
      </CheckboxGroup>
    </JFormItem>
    */} -->
  </JForm>

  <JForm
    ref="formComp2"
    require-asterisk-position="right"
    label-width="auto"
    label-position="left"
    @submit="handleSubmit"
  >
    <JFormItem
      label="Name"
      prop="name"
      :required="false"
      :rules="[{ required: true, message: 'Name', trigger: 'change' }]"
    >
      <JInput
        v-model="form.name"
        placeholder="Please input your username"
      ></JInput>
    </JFormItem>
    <JFormItem ref="post" label="Post" prop="post" size="mini" required>
      <JInput v-model="form.post" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>
</template>
