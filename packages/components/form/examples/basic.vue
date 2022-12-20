<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({ name: '', post: '', isRead: false })
</script>

<template>
  <JForm :model="form" label-width="auto" label-position="left">
    <JFormItem label="Name" prop="name">
      <JInput
        v-model="form.name"
        placeholder="Please input your username"
      ></JInput>
    </JFormItem>
    <JFormItem label="Post" prop="post" size="mini" required>
      <JInput v-model="form.name" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>
</template>
