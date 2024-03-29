'use client'

import React, { useContext, useEffect, useState } from 'react'
import { loginFormControls } from '@/utils'
import InputComponent from '@/components/FormElements/InputComponent'
import SelectComponent from '@/components/FormElements/SelectComponent'
import { useRouter } from 'next/navigation'
import { login } from '@/services/login'
import { GlobalContext } from '@/context'
import Cookies from 'js-cookie'

const initialFormData = {
  email: '',
  password: '',
}

export default function Login() {
  const [formData, setFormData] = useState(initialFormData)
  const { isAuthUser, setIsAuthUser, user, setUser } = useContext(GlobalContext)

  const router = useRouter()

  // console.log(formData)

  // form validation check
  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false
  }

  async function handleLogin() {
    const res = await login(formData)

    // console.log(res)

    if (res.success) {
      setIsAuthUser(true)
      setUser(res?.finalData?.user)
      setFormData(initialFormData)
      Cookies.set('token', res?.finalData.token)
      localStorage.setItem('user', JSON.stringify(res?.finalData?.user))
    } else {
      setIsAuthUser(false)
    }
  }

  console.log(isAuthUser, user)

  useEffect(() => {
    if (isAuthUser) router.push('/')
  }, [isAuthUser])

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlIem) =>
                  controlIem.componentType === 'input' ? (
                    <InputComponent
                      type={controlIem.type}
                      placeholder={controlIem.placeholder}
                      label={controlIem.label}
                      value={formData[controlIem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlIem.id]: event.target.value,
                        })
                      }}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-45 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    onClick={() => router.push('/register')}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
