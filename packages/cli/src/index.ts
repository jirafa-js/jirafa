#!/usr/bin/env node

import { resolve } from 'path'
import { Command } from 'commander'
import { readJsonSync } from 'fs-extra'

import { changelog } from './commands/changelog'

import { ROOT_DIR } from './shared/constant'

const version = readJsonSync(resolve(ROOT_DIR, 'package.json')).version

const program = new Command()

program.name('jirafa').version(`jirafa ${version}`).usage('<command> [options]')

program
  .command('changelog')
  .option('-rc, --releaseCount <number>', 'release count')
  .option('-f, --file <file>', 'changelog filename')
  .description('generate changelog')
  .action(changelog)

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  // logger.error(`\nUnknown command '${cmd}'.\n`)
  process.exitCode = 1
})

program.parse()
