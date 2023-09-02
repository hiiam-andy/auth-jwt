import { UserInterface } from "../UserInterface"

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: UserInterface
}