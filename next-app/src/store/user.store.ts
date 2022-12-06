import { USER_STORAGE_KEY } from "@/constants";
import { User } from "@/types/user.type";
import create from "zustand";
import { IUserState } from "./interface/user.interface";

export const UserStore = create<IUserState>((set, get) => ({
  user: null,

  isLoggedIn () {
    return get().user != null
  },

  username () {
    const user = get().user
    return user ? `${user.firstname} ${user.lastname}` : 'Guest'
  },

  setUser(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    set({ user })
  },

  loadUser() {
    const userStr = localStorage.getItem(USER_STORAGE_KEY) ?? null
    const user = userStr ? JSON.parse(userStr) : null
    set({ user })
  },

  clearUser() {
    localStorage.removeItem(USER_STORAGE_KEY)
    set({ user: null })
  }
}))