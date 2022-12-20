<script lang="ts" setup>
import * as Icons from '@jirafa/icons'
import copy from 'clipboard-copy'
import { computed, ref } from 'vue'

const keyword = ref('')
const style = ref('')
const copyCode = ref(true)
const copySvgIcon = async (name: string) => {
  try {
    const content = copyCode.value
      ? `<JICon${name === 'Loading' ? ' spining' : ''}><${name} /></JIcon>`
      : document.getElementById(name)?.outerHTML || ''

    await copy(content)
    // TODO alert feedback
  } catch {
    //
  }
}

const icons = Object.values(Icons)
const layoutIons = computed(() => {
  const k = keyword.value.trim().toLocaleLowerCase()
  if (!k) return icons
  return icons.filter((comp) => comp.name.toLocaleLowerCase().includes(k))
})

// const layoutIons = computed(() => {
//   return Object.entries(icons)
//     .map(([type, components]) => {
//       const comps = components.filter((comp) => {
//         if (style.value && style.value !== comp.style) return false
//         if (
//           keyword.value &&
//           !comp.name
//             .toLocaleLowerCase()
//             .includes(keyword.value.toLocaleLowerCase())
//         ) {
//           return false
//         }

//         return true
//       })

//       return { type, components: comps }
//     })
//     .filter((item) => !!item.components.length)
// })
</script>

<template>
  <header>
    <!-- todo svg search -->
    <!-- todo checkbox -->
    <input id="check" v-model="copyCode" type="checkbox" />
    <label for="check">{{
      copyCode ? 'Copy icon code' : 'Copy SVG content'
    }}</label>
    <JInput v-model="keyword" />
  </header>
  <ul class="demo-icon-list">
    <li
      v-for="component in layoutIons"
      :key="component.name"
      class="icon-item"
      @click="copySvgIcon(component.name)"
    >
      <span class="demo-svg-icon">
        <JIcon :size="20" :spining="component.name.startsWith('Loading')">
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

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
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
