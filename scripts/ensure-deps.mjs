import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const viteEntry = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js')
const [nodeMajor, nodeMinor] = process.versions.node.split('.').map(Number)

if (nodeMajor < 18 || (nodeMajor === 18 && nodeMinor < 18)) {
  console.error(`Node.js 18.18 or newer is required. You have ${process.versions.node}.`)
  console.error('Install a newer version from https://nodejs.org/ and try again.')
  process.exit(1)
}

if (existsSync(viteEntry)) {
  process.exit(0)
}

console.log('Installing project dependencies from package-lock.json...')

const result = spawnSync('npm', ['ci'], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

if (result.error) {
  console.error(`Could not run npm: ${result.error.message}`)
  console.error('Install Node.js 18.18 or newer from https://nodejs.org/ and try again.')
  process.exit(1)
}

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
