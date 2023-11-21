import { Optional } from '@/@types/optional'
import { StringUtils } from '@/core/utils/string-utils'

type AddressProps = Optional<{
  addressType: string
  street: string
  addressNumber: string
  addressComplement: string
  zipCode: string
  neighborhood: string
  city: string
  state: string
}>

export class Address {
  private constructor(private props: AddressProps) {}

  get addressType() {
    return this.props.addressType
  }

  get street() {
    return this.props.street
  }

  get addressNumber() {
    return this.props.addressNumber
  }

  get addressComplement() {
    return this.props.addressComplement
  }

  get zipCode() {
    return this.props.zipCode
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get isIncomplete() {
    return !this.street || !this.addressNumber || !this.city || !this.zipCode
  }

  static create(props: AddressProps) {
    return new Address(props)
  }

  toZipCode() {
    if (!this.zipCode) return null
    return this.zipCode.replace(/\D+/g, '').replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  toComplement() {
    if (!this.addressComplement) return null
    return StringUtils.toCapitalCase(this.addressComplement)
  }

  toAddress() {
    if (this.street && this.addressType && this.addressNumber) {
      const street = StringUtils.toCapitalCase(this.street)
      const addressType = StringUtils.toCapitalCase(this.addressType)
      const complement = this.toComplement()
      if (complement) {
        return `${addressType}. ${street}, ${this.addressNumber} - ${complement}`
      }
      return `${addressType}. ${street}, ${this.addressNumber}`
    }
    return null
  }

  toLocaleCity() {
    if (this.city && this.state) {
      const city = StringUtils.toCapitalCase(this.city)
      return `${city} - ${this.state.toUpperCase()}`
    }
    return null
  }

  toNeighborhood() {
    if (!this.neighborhood) return null
    return StringUtils.toCapitalCase(this.neighborhood)
  }
}
