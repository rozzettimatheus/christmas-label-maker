import { UseCase } from '@/core/use-cases/use-case'
import { TagMaker } from '@/infra/providers/pdf/tag-maker'
import { SpreadsheetReader } from '@/infra/providers/spreadsheet/spreadsheet-reader'
import { FileStorage } from '@/infra/providers/storage/file-storage'
import { FileNotFoundError } from '@/core/errors/file-not-found-error'
import { RecordMapper } from '../mappers/map-record-to-patient'
import { Patient } from '@/domain/enterprise/entities/patient'

type Input = {
  filename: string
}

type Output = {
  fileUrl: string
}

export class ExportFileToPatientAddressTagsUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly fileStorage: FileStorage,
    private readonly spreadsheetReader: SpreadsheetReader,
    private readonly tagMaker: TagMaker,
  ) {}

  async exec({ filename }: Input): Promise<Output> {
    const fileExists = await this.fileStorage.exists(filename)
    if (!fileExists) {
      throw new FileNotFoundError()
    }
    const { filepath } = fileExists
    const records = this.spreadsheetReader.readFrom(filepath)
    const patients: Patient[] = []
    let isTableHeader = true
    let dictionary
    for await (const record of records) {
      if (isTableHeader) {
        dictionary = RecordMapper.mapEntriesIndex(record)
        isTableHeader = false
        continue
      }
      if (dictionary) {
        patients.push(RecordMapper.toDomain({ record, dictionary }))
      }
    }
    const filteredPatients = patients.filter(
      (p) => !p.address.isAddressIncomplete,
    )
    await this.fileStorage.delete(filename)
    return this.tagMaker.make(filteredPatients)
  }
}
