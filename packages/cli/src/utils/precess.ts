import { spawn } from 'child_process'
import { DIR_ROOT } from '../../shared'
import { colorize, createLogger } from './logger'
const logger = createLogger()

export const run = (command: string, cwd = DIR_ROOT) => {
  return new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    logger.info('run', colorize('success', `${cmd} ${args.join(' ')}`))

    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    const onProcessExit = () => app.kill('SIGHUP')

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)

      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    process.on('exit', onProcessExit)
  })
}
