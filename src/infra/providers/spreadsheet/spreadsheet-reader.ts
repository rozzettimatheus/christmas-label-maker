export type ReaderEntry = string | undefined | null

export interface SpreadsheetReader {
  readFrom(filePath: string): AsyncGenerator<ReaderEntry[]>
}
