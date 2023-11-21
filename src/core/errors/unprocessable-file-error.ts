export class UnprocessableFileError extends Error {
  constructor() {
    super('File is unprocessable')
  }
}
