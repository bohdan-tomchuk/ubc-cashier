export interface IUser {
  email: string | null,
  token: string | null
}

export interface IUserCredentials {
  email: string,
  password: string
}