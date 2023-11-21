import { Entity } from '@/core/entities/entity'
import { Name } from './value-objects/name'
import { Address } from './value-objects/address'
import { Optional } from '@/@types/optional'

type PatientProps = {
  name: Name
  address: Address
}

export class Patient extends Entity<PatientProps> {
  get name() {
    return this.props.name
  }

  get address() {
    return this.props.address
  }

  static create(props: PatientProps, id?: Optional<string>) {
    return new Patient(props, id)
  }

  format() {
    const fields = []
    fields.push(this.name.toValue())
    if (!this.address.isIncomplete) fields.push(this.address.toAddress())
    if (this.address.neighborhood) fields.push(this.address.toNeighborhood())
    if (this.address.toLocaleCity()) fields.push(this.address.toLocaleCity())
    if (this.address.toZipCode()) fields.push(this.address.toZipCode())
    return fields
  }
}
