export type AccountTypes = "participante" | "organizador"

export interface UserData {
  nome: string,
  email: string,
  accountType: AccountTypes
}