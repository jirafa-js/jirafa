<script lang="ts" setup>
import type { ComponentSizes } from '@jirafa/utils'
import { reactive, ref } from 'vue'

const size = ref<ComponentSizes>('large')
const form = reactive({ name: '', post: '' })
</script>

<template>
  <JSpace direction="vertical">
    <!-- <JRadioGroup v-model="size" label="position control">
      <JRadioButton value="mini">Mini</JRadioButton>
      <JRadioButton value="small">Small</JRadioButton>
      <JRadioButton value="">Default</JRadioButton>
      <JRadioButton value="large">Large</JRadioButton>
    </JRadioGroup> -->
    <JForm :size="size">
      <JFormItem label="Name" prop="name">
        <JInput
          v-model="form.name"
          placeholder="Please input your username"
        ></JInput>
      </JFormItem>
      <JFormItem label="Post" prop="post" size="mini" required>
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
