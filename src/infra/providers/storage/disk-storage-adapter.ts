import fs from 'node:fs'
import { stat, unlink } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { randomBytes } from 'node:crypto'

import { FileStorage } from './file-storage'

export class DiskFileStorageAdapter implements FileStorage {
  private readonly TMP_DIR = './uploads'

  async write(filename: string, file: Buffer) {
    const ext = filename.split('.').pop()
    const updatedFilename = `file_${randomBytes(10).toString('hex')}.${ext}`
    await pipeline(
      Readable.from(file),
      fs.createWriteStream(`${this.TMP_DIR}/${updatedFilename}`),
    )

    return { filename: updatedFilename, original: filename }
  }

  async delete(filename: string): Promise<void> {
    const path = this.buildPathFrom(filename)
    await unlink(path)
  }

  async exists(filename: string) {
    const path = this.buildPathFrom(filename)
    return stat(path)
      .then(() => ({
        filepath: path,
      }))
      .catch(() => null)
  }

  private buildPathFrom(filename: string) {
    return `${this.TMP_DIR}/${filename}`
  }
}
