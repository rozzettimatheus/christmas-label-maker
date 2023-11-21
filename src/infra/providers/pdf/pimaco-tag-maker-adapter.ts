import fs from 'node:fs'

import { TagMaker } from './tag-maker'
import { Patient } from '@/domain/enterprise/entities/patient'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrintTag = require('print-tag')

export class Pimaco6180TagMakerAdapter implements TagMaker {
  private readonly BASE_DIR = './assets/pdf'
  private readonly printTag = new PrintTag('pimaco_6180')
  private readonly BASE_LINE_HEIGHT = 4

  async make(
    data: Patient[],
    filename?: string,
  ): Promise<{ fileUrl: string } | null> {
    const fileUrl = `${this.BASE_DIR}/${filename ?? 'etiquetas'}.pdf`
    const writableStream = fs.createWriteStream(fileUrl)
    this.printTag.doc.pipe(writableStream)
    this.printTag.doc.fontSize(3)

    return new Promise((resolve, reject) => {
      try {
        this.printTag.makeTickets(
          {
            count: data.length,
          },
          this.handleTagPrint(data),
          () => {
            this.printTag.doc.end()
            resolve({ fileUrl })
          },
        )
      } catch (err) {
        console.error('[PIMACO TAG MAKER ADAPTER]', err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(null)
      }
    })
  }

  private handleTagPrint =
    (data: Patient[]) =>
    (
      index: number,
      marginLeft: number,
      marginTop: number,
      size: { width: number; height: number },
      next: () => void,
    ) => {
      const patient = data[index]
      const fields = patient.format()
      fields.forEach((field, idx) => {
        if (idx === fields.length - 1) {
          this.printTag.doc.font('Helvetica-Bold')
        } else {
          this.printTag.doc.font('Helvetica')
        }
        this.printTag.doc.text(
          field,
          marginLeft + 2,
          marginTop + idx * this.BASE_LINE_HEIGHT,
          size,
        )
      })
      next()
    }
}
