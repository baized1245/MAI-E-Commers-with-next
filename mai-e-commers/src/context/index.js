'use client'

import Cookies from 'js-cookie'
import React, { useState, createContext, useEffect } from 'react'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false)
  const [commonLoader, setCommonLoader] = useState(false)
  const [isAuthUser, setIsAuthUser] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log(Cookies.get('token'))

    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true)
      const userData = JSON.parse(localStorage.getItem('user')) || {}
      setUser(userData)
    } else {
      setIsAuthUser(false)
    }
  }, [Cookies])

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        commonLoader,
        setCommonLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
