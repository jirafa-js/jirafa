import { resolve as r } from 'path'
import ora from 'ora'
import conventionalChangelog from 'conventional-changelog'
import { createWriteStream } from 'fs-extra'

import { ROOT_DIR } from '../shared/constant'

interface ChangelogOptions {
  file?: string
  releaseCount?: number
}

export const changelog = ({ releaseCount = 0, file = 'CHANGELOG.md' }: ChangelogOptions = {}) => {
  const o = ora().start('Generating changelog')

  return new Promise<void>((resolve) => {
    conventionalChangelog({
      preset: 'angular',
      releaseCount,
    })
      .pipe(createWriteStream(r(ROOT_DIR, file)))
      .on('close', () => {
        o.succeed('Changelog generated success!')
        resolve()
      })
  })
}
