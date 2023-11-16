import { Patient } from '@/domain/enterprise/entities/patient'

export interface TagMaker {
  make(data: Patient[]): Promise<{ fileUrl: string }>
}
