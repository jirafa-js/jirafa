import { computed, reactive } from 'vue'

export const useFormItemLabelWidth = () => {
  const labelWidth = reactive<Record<string, number>>({})

  const autoLabelWidth = computed(() => {
    const max = Math.max(0, ...Object.values(labelWidth))
    return max ? `${max}px` : ''
  })

  const setLabelWidth = (width: number, uid?: number) => {
    if (uid && labelWidth[uid] !== width) {
      labelWidth[uid] = width
    }
  }

  const removeLabelWidth = (uid?: number) => {
    if (uid) {
      delete labelWidth[uid]
    }
  }

  return {
    autoLabelWidth,
    setLabelWidth,
    removeLabelWidth,
  }
}

export type FormItemLabelWidthContext = ReturnType<typeof useFormItemLabelWidth>
