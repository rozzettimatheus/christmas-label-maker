import { Optional } from '@/@types/optional'

export class Name {
  private constructor(private value?: Optional<string>) {}

  static create(value?: Optional<string>) {
    return new Name(value)
  }

  toValue() {
    return this.value
  }
}
