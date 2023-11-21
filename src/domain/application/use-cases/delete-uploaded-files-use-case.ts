import { FileNotFoundError } from '@/core/errors/file-not-found-error'
import { UseCase } from '@/core/use-cases/use-case'
import { FileStorage } from '@/infra/providers/storage/file-storage'

type Input = {
  filenames: string[]
}

export class DeleteUploadedFilesUseCase implements UseCase<Input, void> {
  constructor(private readonly fileStorage: FileStorage) {}

  async exec({ filenames }: Input): Promise<void> {
    for (const filename of filenames) {
      const fileExists = await this.fileStorage.exists(filename)
      if (!fileExists) {
        throw new FileNotFoundError()
      }
      await this.fileStorage.delete(filename)
    }
  }
}
