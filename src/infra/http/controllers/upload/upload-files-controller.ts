import { FastifyReply, FastifyRequest } from 'fastify'

import { UnsupportedXlsFileError } from '@/core/errors/unsupported-xls-file-error'
import { UploadFilesUseCase } from '@/domain/application/use-cases/upload-files-use-case'

export class UploadFilesController {
  constructor(private readonly uploadFiles: UploadFilesUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const files = []
    for await (const part of request.files()) {
      files.push({
        filename: part.filename,
        mimetype: part.mimetype,
        file: await part.toBuffer(),
      })
    }
    try {
      const uploadedFiles = await this.uploadFiles?.exec({ files })
      return reply.status(200).send(uploadedFiles)
    } catch (err) {
      if (err instanceof UnsupportedXlsFileError) {
        return reply.status(400).send({
          error: {
            message: 'Unsupported',
            type: 'unsupported',
          },
        })
      }
    }
  }
}
