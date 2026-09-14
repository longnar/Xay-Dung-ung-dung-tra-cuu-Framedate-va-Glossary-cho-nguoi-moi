import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDirectory = path.resolve(projectRoot, '..', 'asset', 'card')
const outputDirectory = path.resolve(projectRoot, 'public', 'cards')
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
}

const files = (await readdir(sourceDirectory))
  .filter((fileName) => mimeTypes[path.extname(fileName).toLowerCase()])
  .sort((left, right) => left.localeCompare(right))

await mkdir(outputDirectory, { recursive: true })

const manifest = []
for (const fileName of files) {
  const extension = path.extname(fileName).toLowerCase()
  const characterName = fileName.replace(/\s+Promo Art Big(?: 2)?\.(?:jpg|jpeg|png)$/i, '')
  const encodedFileName = `${fileName}.txt`
  const imageBuffer = await readFile(path.join(sourceDirectory, fileName))

  await writeFile(path.join(outputDirectory, encodedFileName), imageBuffer.toString('base64'))
  manifest.push({
    name: characterName,
    file: encodedFileName,
    mimeType: mimeTypes[extension],
  })
}

await writeFile(
  path.join(outputDirectory, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)

console.log(`Encoded ${manifest.length} card images into ${path.relative(projectRoot, outputDirectory)}`)
