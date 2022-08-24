<script lang="ts" setup>
import * as Icons from '@jirafa/icons'
import copy from 'clipboard-copy'
import { ref } from 'vue'

const copyCode = ref(true)
const copySvgIcon = async (
  name: string,
  refs: { [K: string]: HTMLLIElement[] }
) => {
  try {
    const content = copyCode.value
      ? `<JICon><${name} /></JIcon>`
      : refs[name]?.[0].querySelector('svg')?.outerHTML || ''

    await copy(content)
    // TODO alert feedback
  } catch {
    //
  }
}
</script>

<template>
  <header>
    <!-- todo svg search -->
    <!-- todo checkbox -->
    <input id="check" v-model="copyCode" type="checkbox" />
    <label for="check">{{
      copyCode ? 'Copy icon code' : 'Copy SVG content'
    }}</label>
  </header>
  <ul class="demo-icon-list">
    <li
      v-for="component in Icons"
      :key="component.name"
      :ref="component.name"
      class="icon-item"
      @click="copySvgIcon(component.name, $refs as any)"
    >
      <span class="demo-svg-icon">
        <JIcon
          :size="20"
          :class="{ 'is-loading': component.name === 'Loading' }"
        >
          <component :is="component" />
        </JIcon>
        <span class="icon-name">{{ component.name }}</span>
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.demo-icon-list {
  display: grid;
  grid-template-columns: repeat(6, minmax(120px, 1fr));
  list-style: none;
  padding: 1px 0 0 1px;
  overflow: hidden;
}

.icon-item {
  margin: -1px 0 0 -1px !important;
  border: 1px solid var(--site-c-divider);
  text-align: center;
  font-size: 12px;
  height: 100px;
}

.demo-svg-icon {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .icon-name {
    margin-top: 12px;
  }
}
</style>
