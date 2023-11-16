import ExcelJS from 'exceljs'
import fs from 'node:fs'

import { ReaderEntry, SpreadsheetReader } from './spreadsheet-reader'

export class ExcelSpreadsheetReaderAdapter implements SpreadsheetReader {
  async *readFrom(filePath: string): AsyncGenerator<ReaderEntry[]> {
    const fileStream = fs.createReadStream(filePath)
    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(
      fileStream,
      {},
    )
    for await (const worksheetReader of workbookReader) {
      for await (const row of worksheetReader) {
        if (!Array.isArray(row.values)) continue
        yield row.values.map((value) => (value ? String(value) : null))
      }
    }
  }
}
