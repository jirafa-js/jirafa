import type { Plugin } from 'vue'

import { JButton, JButtonGroup } from '@jirafa/components/button'
import { JCol, JGrid, JGridItem, JRow } from '@jirafa/components/grid'
import { JDivider } from '@jirafa/components/divider'
import { JForm, JFormItem } from '@jirafa/components/form'
import { JIcon, JIconFeedback } from '@jirafa/components/icon'
import { JInput } from '@jirafa/components/input'
import { JRadio, JRadioGroup } from '@jirafa/components/radio'
import { JSpace } from '@jirafa/components/space'
import { JTag } from '@jirafa/components/tag'
import { JConfigProvider } from '@jirafa/components/config-provider'

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
  JRadio,
  JRadioGroup,
  JConfigProvider,
] as Plugin[]
