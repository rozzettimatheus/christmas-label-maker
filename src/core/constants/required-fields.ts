export type RequiredFields = {
  id: string
  name: string
  addressType: string
  street: string
  addressNumber: string
  addressComplement: string
  zipCode: string
  neighborhood: string
  city: string
  state: string
  createdAt: string
}

export type RequiredFieldsKeys = keyof RequiredFields

export const requiredFields = new Map<string, RequiredFieldsKeys>([
  ['ID do paciente', 'id'],
  ['Nome do paciente', 'name'],
  ['Endereço - Tipo', 'addressType'],
  ['Endereço - Nome da rua', 'street'],
  ['Endereço - Número', 'addressNumber'],
  ['Endereço - Complemento', 'addressComplement'],
  ['Endereço - CEP', 'zipCode'],
  ['Endereço - Bairro', 'neighborhood'],
  ['Endereço - Cidade', 'city'],
  ['Endereço - UF', 'state'],
  ['Data/hora de criação', 'createdAt'],
])
