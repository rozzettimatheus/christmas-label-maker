import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ExportFileToPatientAddressTagsUseCase } from '@/domain/application/use-cases/export-file-to-patient-address-tags-use-case'
import { FileNotFoundError } from '@/core/errors/file-not-found-error'
import { UnprocessableFileError } from '@/core/errors/unprocessable-file-error'

export class ExportSpreadsheetToTagsController {
  constructor(
    private readonly exportFileToTags: ExportFileToPatientAddressTagsUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      filename: z.string(),
    })
    const { filename } = bodySchema.parse(request.body)
    try {
      const { fileUrl } = await this.exportFileToTags.exec({ filename })
      return reply.status(200).send({ download_url: fileUrl })
    } catch (err) {
      if (err instanceof FileNotFoundError) {
        return reply.status(404).send({
          error: {
            message: 'File not found',
          },
        })
      }
      if (err instanceof UnprocessableFileError) {
        return reply.status(422).send({
          error: {
            message: 'File could not be processed',
          },
        })
      }
      throw err
    }
  }
}
