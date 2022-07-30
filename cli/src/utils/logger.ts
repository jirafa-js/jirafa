import chalk from 'chalk'

export type LogType = 'info' | 'warn' | 'error' | 'success'

export const colorize = (type: LogType, data: any, onlyImportant = false) => {
  if (onlyImportant && (type === 'info' || type === 'success')) return data

  const color =
    type === 'info'
      ? 'blue'
      : type === 'error'
      ? 'red'
      : type === 'warn'
      ? 'yellow'
      : 'green'

  return chalk[color](data)
}

export const makeLabel = (
  name: string | undefined,
  input: string,
  type: LogType
) => {
  return [
    name && `${chalk.dim('[')}${name.toUpperCase()}${chalk.dim(']')}`,
    colorize(type, input.toUpperCase()),
  ]
    .filter(Boolean)
    .join(' ')
}

let silent = false

export function setSilent(isSilent?: boolean) {
  silent = !!isSilent
}

export function getSilent() {
  return silent
}

export type Logger = ReturnType<typeof createLogger>

export const createLogger = (name?: string) => {
  return {
    setName(_name: string) {
      name = _name
    },

    start(label: string, ...args: any[]) {
      const now = Date.now()
      this.info(label, ...args)

      return (...args: any[]) => {
        const duration = Math.floor(Date.now() - now)
        this.success(label, ...args, `in ${duration}ms`)
      }
    },

    success(label: string, ...args: any[]) {
      return this.log(label, 'success', ...args)
    },

    info(label: string, ...args: any[]) {
      return this.log(label, 'info', ...args)
    },

    error(label: string, ...args: any[]) {
      return this.log(label, 'error', ...args)
    },

    warn(label: string, ...args: any[]) {
      return this.log(label, 'warn', ...args)
    },

    log(label: string, type: LogType, ...data: unknown[]) {
      if (type === 'error') {
        console.error(
          makeLabel(name, label, type),
          ...data.map((item) => colorize(type, item, true))
        )
        return
      }

      // eslint-disable-next-line no-console
      console.log(
        makeLabel(name, label, type),
        ...data.map((item) => colorize(type, item, true))
      )
    },
  }
}
