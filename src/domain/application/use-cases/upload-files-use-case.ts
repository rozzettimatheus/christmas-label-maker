import { UnsupportedXlsFileError } from '@/core/errors/unsupported-xls-file-error'
import { UseCase } from '@/core/use-cases/use-case'
import { FileStorage } from '@/infra/providers/storage/file-storage'

type File = {
  filename: string
  mimetype: string
  file: Buffer
}

type Input = {
  files: File[]
}

type Output = {
  uploaded: { filename: string }[]
}

export class UploadFilesUseCase implements UseCase<Input, Output> {
  private readonly ACCEPTED_TYPES = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]

  constructor(private readonly fileStorage: FileStorage) {}

  async exec({ files }: Input): Promise<Output> {
    const isAllFilesAllowed = files.every(this.isFiletypeAllowed.bind(this))
    if (!isAllFilesAllowed) {
      throw new UnsupportedXlsFileError()
    }
    const writeFilesPromises = files.map((file) =>
      this.fileStorage.write(file.filename, file.file),
    )
    const uploadedFiles = await Promise.all(writeFilesPromises)
    return {
      uploaded: uploadedFiles,
    }
  }

  private isFiletypeAllowed(file: File) {
    return (
      file.filename.includes('xls') &&
      this.ACCEPTED_TYPES.includes(file.mimetype)
    )
  }
}
