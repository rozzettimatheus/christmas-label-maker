import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ExportFileToPatientAddressTagsUseCase } from '@/domain/application/use-cases/export-file-to-patient-address-tags-use-case'

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
    } catch (err) {}
  }
}
