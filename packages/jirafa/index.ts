import installer from './installer'
export * from '@jirafa/components'
export * from '@jirafa/utils/constants'
export * from '@jirafa/tokens'
export * from '@jirafa/hooks'

export const version = installer.version

export const install = installer.install

export default installer
