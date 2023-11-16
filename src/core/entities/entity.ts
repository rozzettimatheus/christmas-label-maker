import { Optional } from '@/@types/optional'

export abstract class Entity<Props> {
  private _id: string
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: Optional<string>) {
    this._id = id ?? ''
    this.props = props
  }
}
