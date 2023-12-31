import { makeAutoObservable } from "mobx";
import { UserInterface } from "../models/UserInterface";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as UserInterface
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: UserInterface) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async registration(email: string, password: string) {
    try {
      const res = await AuthService.registration(email, password)
      console.log(res)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err: any) {
      console.log(err.res?.data?.message)
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await AuthService.login(email, password)
      console.log(res)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err: any) {
      console.log(err.res?.data?.message)
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as UserInterface)
    } catch (err: any) {
      console.log(err.res?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const res = await axios.get<AuthResponse>(
        `${API_URL}/refresh`,
        { withCredentials: true }
      )
      console.log(res)
      localStorage.setItem('token', res.data.accessToken)
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch (err: any) {
      console.log(err.res?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}