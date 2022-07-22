import { resolve as r } from 'path'
import ora from 'ora'
import conventionalChangelog from 'conventional-changelog'
import { createWriteStream } from 'fs-extra'

import { DIR_ROOT } from '../../shared/paths'

interface ChangelogOptions {
  file?: string
  releaseCount?: number
}

export const changelog = ({
  releaseCount = 0,
  file = 'CHANGELOG.md',
}: ChangelogOptions = {}) => {
  const o = ora().start('Generating changelog')

  return new Promise<void>((resolve) => {
    conventionalChangelog({
      preset: 'angular',
      releaseCount,
    })
      .pipe(createWriteStream(r(DIR_ROOT, file)))
      .on('close', () => {
        o.succeed('Changelog generated success!')
        resolve()
      })
  })
}
