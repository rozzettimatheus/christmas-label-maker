import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { DeleteUploadedFilesUseCase } from '@/domain/application/use-cases/delete-uploaded-files-use-case'
import { FileNotFoundError } from '@/core/errors/file-not-found-error'

export class DeleteUploadedFilesController {
  constructor(
    private readonly deleteUploadedFiles: DeleteUploadedFilesUseCase,
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      filenames: z.array(z.string()),
    })
    const { filenames } = bodySchema.parse(request.body)

    try {
      await this.deleteUploadedFiles.exec({ filenames })
      return reply.status(204).send()
    } catch (err) {
      if (err instanceof FileNotFoundError) {
        return reply.status(400).send({
          error: {
            message: 'File requested was not found',
          },
        })
      }
    }
  }
}
