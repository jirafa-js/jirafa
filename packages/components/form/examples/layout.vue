<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({ name: '', region: '', intro: '' })
</script>

<template>
  <JForm :model="form" label-width="auto">
    <JFormItem label="Name Long">
      <JInput v-model="form.name" />
    </JFormItem>
    <JFormItem label="Intro">
      <JInput v-model="form.intro" />
    </JFormItem>
  </JForm>
  <JForm
    :model="form"
    layout="horizontal"
    label-width="180px"
    label-position="right"
  >
    <JFormItem label="名称" prop="name">
      <JInput v-model="form.name"></JInput>
    </JFormItem>
    <JFormItem label="活动区域" prop="region" label-width="auto" required>
      <JInput v-model="form.name" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem
      label="活动形式(我是一个很长很长很长很长的label)"
      prop="post"
      label-width="auto"
      required
    >
      <JInput v-model="form.name" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>
  <JForm :model="form" layout="vertical">
    <JFormItem label="Name" prop="name">
      <JInput
        v-model="form.name"
        placeholder="Please input your username"
      ></JInput>
    </JFormItem>
    <JFormItem label="Post" prop="post" required>
      <JInput v-model="form.name" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>
  <JForm :model="form" layout="inline">
    <JFormItem label="Name" prop="name">
      <JInput
        v-model="form.name"
        placeholder="Please input your username"
      ></JInput>
    </JFormItem>
    <JFormItem label="Post" prop="post" required>
      <JInput v-model="form.name" placeholder="Please input your post"></JInput>
    </JFormItem>
    <JFormItem>
      <JButton type="primary" html-type="submit">Submit</JButton>
    </JFormItem>
  </JForm>
</template>
