import { User } from "@/types/user.type";

export interface IUserState {
  user: User | null

  username: () => string
  isLoggedIn: () => boolean

  setUser: (user: User) => void
  loadUser: () => void
  clearUser: () => void
}
