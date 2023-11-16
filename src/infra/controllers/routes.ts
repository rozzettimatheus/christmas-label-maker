import { FastifyInstance } from 'fastify'

import { ExportSpreadsheetToTagsController } from './tags/export-spreadsheet-to-tags-controller'
import { UploadFilesController } from './upload/upload-files-controller'
import { UploadFileUseCase } from '@/domain/application/use-cases/upload-file-use-case'
import { DiskFileStorageAdapter } from '../providers/storage/disk-storage-adapter'
import { ExcelSpreadsheetReaderAdapter } from '../providers/spreadsheet/excel-spreadsheet-reader-adapter'
import { ExportFileToPatientAddressTagsUseCase } from '@/domain/application/use-cases/export-file-to-patient-address-tags-use-case'
import { Pimaco6180TagMakerAdapter } from '../providers/pdf/pimaco-tag-maker-adapter'

const fileStorage = new DiskFileStorageAdapter()
const spreadsheetReader = new ExcelSpreadsheetReaderAdapter()
const tagMaker = new Pimaco6180TagMakerAdapter()

const uploadFiles = new UploadFileUseCase(fileStorage)
const uploadFilesController = new UploadFilesController(uploadFiles)

const exportFile = new ExportFileToPatientAddressTagsUseCase(
  fileStorage,
  spreadsheetReader,
  tagMaker,
)
const exportSpreadsheetToTags = new ExportSpreadsheetToTagsController(
  exportFile,
)

export async function routes(app: FastifyInstance) {
  app.post('/upload', (request, reply) =>
    uploadFilesController.handle(request, reply),
  )
  app.post('/export', (request, reply) =>
    exportSpreadsheetToTags.handle(request, reply),
  )
}
