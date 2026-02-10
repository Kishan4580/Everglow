import { createContext } from "react"

export const AccountContext = createContext({isLogin : true, setLogin : () => {}})