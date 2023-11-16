import { Patient } from '@/domain/enterprise/entities/patient'
import { ReaderEntry } from '@/infra/providers/spreadsheet/spreadsheet-reader'
import {
  RequiredFieldsKeys,
  requiredFields,
} from '@/core/constants/required-fields'
import { StringUtils } from '@/core/utils/string-utils'
import { Name } from '@/domain/enterprise/entities/value-objects/name'
import { Address } from '@/domain/enterprise/entities/value-objects/address'

type EntriesIndexes = Record<RequiredFieldsKeys, { index: number }>
type ToDomainProps = {
  record: ReaderEntry[]
  dictionary: EntriesIndexes
}

export class RecordMapper {
  static toDomain({ record, dictionary }: ToDomainProps): Patient {
    const map = new Map<RequiredFieldsKeys, string | undefined | null>()
    for (const [key, v] of Object.entries(dictionary)) {
      const value = record.at(v.index)
      map.set(key as RequiredFieldsKeys, StringUtils.clean(value))
    }
    return Patient.create(
      {
        name: Name.create(map.get('name')),
        address: Address.create({
          addressType: map.get('addressType'),
          street: map.get('street'),
          addressNumber: map.get('addressNumber'),
          addressComplement: map.get('addressComplement'),
          neighborhood: map.get('neighborhood'),
          city: map.get('city'),
          state: map.get('state'),
          zipCode: map.get('zipCode'),
        }),
      },
      map.get('id'),
    )
  }

  static mapEntriesIndex(header: ReaderEntry[]): EntriesIndexes {
    return Array.from(requiredFields.entries()).reduce((acc, curr) => {
      const [key, field] = curr
      console.log(header)
      acc[field] = { index: header.findIndex((v) => v === key) }
      return acc
    }, {} as EntriesIndexes)
  }
}
