import { withInstall } from '@jirafa/utils'

import ConfigProvider from './src/config-provider'

export * from './src/config-provider'

export const JConfigProvider = withInstall(ConfigProvider)

export default JConfigProvider
