import { isString } from './types'

export class JirafaError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'JirafaError'
  }
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new JirafaError(`[${scope}] ${message}`)
      : scope

    console.warn(error)
  }
}
