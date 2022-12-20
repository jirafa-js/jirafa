import type { Plugin } from 'vue'

import { JButton, JButtonGroup } from '@jirafa/components/button'
import { JIcon, JIconFeedback } from '@jirafa/components/icon'
import { JTag } from '@jirafa/components/tag'
import { JSpace } from '@jirafa/components/space'
import { JCol, JGrid, JGridItem, JRow } from '@jirafa/components/grid'
import { JDivider } from '@jirafa/components/divider'
import { JForm, JFormItem } from '@jirafa/components/form'
import { JInput } from '@jirafa/components/input'

export default [
  JButton,
  JButtonGroup,
  JIcon,
  JIconFeedback,
  JTag,
  JSpace,
  JRow,
  JCol,
  JGrid,
  JGridItem,
  JDivider,
  JForm,
  JFormItem,
  JInput,
] as Plugin[]
