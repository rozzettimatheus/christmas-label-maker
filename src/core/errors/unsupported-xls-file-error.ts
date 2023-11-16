export class UnsupportedXlsFileError extends Error {
  constructor() {
    super('Unsupported filetype, only XLS and XLSX are accepted')
  }
}
