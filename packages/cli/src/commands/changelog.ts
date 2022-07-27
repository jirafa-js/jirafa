import { resolve as r } from 'path'
import conventionalChangelog from 'conventional-changelog'
import { createWriteStream } from 'fs-extra'

import { DIR_ROOT } from '../../shared'
import { createLogger } from '../utils/logger'

interface ChangelogOptions {
  file?: string
  releaseCount?: number
}

const logger = createLogger()

export const changelog = ({
  releaseCount = 0,
  file = 'CHANGELOG.md',
}: ChangelogOptions = {}) => {
  const log = logger.start('changlog', 'Generating changelog')

  return new Promise<void>((resolve) => {
    conventionalChangelog({
      preset: 'angular',
      releaseCount,
    })
      .pipe(createWriteStream(r(DIR_ROOT, file)))
      .on('close', () => {
        log('Changelog generated success!')
        resolve()
      })
  })
}
