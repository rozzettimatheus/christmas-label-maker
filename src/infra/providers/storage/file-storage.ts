type WriteFileOutput = {
  filename: string
  original: string
}

type FileExistsOutput = {
  filepath: string
}

export interface FileStorage {
  write(filename: string, file: Buffer): Promise<WriteFileOutput>
  delete(filename: string): Promise<void>
  exists(filename: string): Promise<FileExistsOutput | null>
}
