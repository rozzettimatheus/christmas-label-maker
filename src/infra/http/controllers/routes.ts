import { FastifyInstance } from 'fastify'

import { ExportSpreadsheetToTagsController } from './tags/export-spreadsheet-to-tags-controller'
import { UploadFilesController } from './upload/upload-files-controller'
import { UploadFilesUseCase } from '@/domain/application/use-cases/upload-files-use-case'
import { DiskFileStorageAdapter } from '../../providers/storage/disk-storage-adapter'
import { ExcelSpreadsheetReaderAdapter } from '../../providers/spreadsheet/excel-spreadsheet-reader-adapter'
import { ExportFileToPatientAddressTagsUseCase } from '@/domain/application/use-cases/export-file-to-patient-address-tags-use-case'
import { Pimaco6180TagMakerAdapter } from '../../providers/pdf/pimaco-tag-maker-adapter'
import { DeleteUploadedFilesController } from './upload/delete-uploaded-files-controller'
import { DeleteUploadedFilesUseCase } from '@/domain/application/use-cases/delete-uploaded-files-use-case'

const fileStorage = new DiskFileStorageAdapter()
const spreadsheetReader = new ExcelSpreadsheetReaderAdapter()
const tagMaker = new Pimaco6180TagMakerAdapter()

const uploadFiles = new UploadFilesUseCase(fileStorage)
const uploadFilesController = new UploadFilesController(uploadFiles)

const exportFile = new ExportFileToPatientAddressTagsUseCase(
  fileStorage,
  spreadsheetReader,
  tagMaker,
)
const exportSpreadsheetToTags = new ExportSpreadsheetToTagsController(
  exportFile,
)

const deleteFiles = new DeleteUploadedFilesUseCase(fileStorage)
const deleteFilesController = new DeleteUploadedFilesController(deleteFiles)

export async function routes(app: FastifyInstance) {
  app.post('/export', (request, reply) =>
    exportSpreadsheetToTags.handle(request, reply),
  )
  app.post('/upload', (request, reply) =>
    uploadFilesController.handle(request, reply),
  )
  app.delete('/upload', (request, reply) =>
    deleteFilesController.handle(request, reply),
  )
}
