<script lang="ts" setup>
import type { ComponentSizes } from '@jirafa/utils'
import { reactive, ref } from 'vue'

const size = ref<ComponentSizes>('')
const form = reactive({ name: '', post: '' })
</script>

<template>
  <JSpace direction="vertical">
    <JRadioGroup v-model="size" type="button">
      <JRadio value="mini">Mini</JRadio>
      <JRadio value="small">Small</JRadio>
      <JRadio value="">Default</JRadio>
      <JRadio value="large">Large</JRadio>
    </JRadioGroup>
    <JForm :size="size">
      <JFormItem label="Name" prop="name">
        <JInput
          v-model="form.name"
          placeholder="Please input your username"
        ></JInput>
      </JFormItem>
      <JFormItem label="Post" prop="post" required>
        <JInput
          v-model="form.post"
          placeholder="Please input your post"
        ></JInput>
      </JFormItem>
      <JFormItem>
        <JButton type="primary" html-type="submit">Submit</JButton>
      </JFormItem>
    </JForm>
  </JSpace>
</template>
