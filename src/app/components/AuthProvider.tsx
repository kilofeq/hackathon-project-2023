'use client'
import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect } from "react"
import { auth } from "../helpers/firebase"

const AuthProvider = ({children}: {children: ReactNode}) => {
  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      console.log(user)
    })
  }, [])
  return children
}

export default AuthProvider
