import { withInstall, withNoopInstall } from '@jirafa/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export * from './src/form'
export * from './src/form-item'
export type { FormItemLabelWidthContext } from './src/form-item-label'

export const JForm = withInstall(Form, { FormItem })

export const JFormItem = withNoopInstall(FormItem)

export default JForm
