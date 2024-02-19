'use client'

import { GlobalContext } from '@/context'
// import Image from 'next/image'
import React, { useContext } from 'react'

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext)
  return (
    <main>
      <h1>Hey Sinamika</h1>
    </main>
  )
}
