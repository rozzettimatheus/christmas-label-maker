import fs from 'node:fs'

import { UseCase } from './core/use-cases/use-case'
import { TagMaker } from '@/infra/providers/pdf/tag-maker'

const PrintTag = require('print-tag')

export class GenerateTagsUseCase implements UseCase<any[], void> {
  constructor(private tagMaker: TagMaker) {}

  async run(input: any[]): Promise<void> {
    await this.tagMaker.setConfig({}).make(input)
  }
}
