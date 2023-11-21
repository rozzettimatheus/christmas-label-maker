import { Patient } from '@/domain/enterprise/entities/patient'

export interface TagMaker {
  make(data: Patient[], filename?: string): Promise<{ fileUrl: string } | null>
}
