/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { LayoutContext } from '../../../../layout/context/layoutcontext'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useAuthService } from '@/service/auth/auth.service'
import { Toast } from 'primereact/toast'

const LoginPage = () => {
  /**
   * *import auth service
   */
  const { toast, formData, handleChange, handleLogin } = useAuthService()

  const [checked, setChecked] = useState(false)
  const { layoutConfig } = useContext(LayoutContext)

  const router = useRouter()
  const containerClassName = classNames(
    'surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden',
    { 'p-input-filled': layoutConfig.inputStyle === 'filled' }
  )

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: '53px' }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Login to Your Account
              </div>
            </div>

            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Email
              </label>
              <InputText
                id="email1"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full md:w-30rem mb-5"
                style={{ padding: '1rem' }}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <Password
                inputId="password1"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
              />

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked ?? false)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                {/* <a
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: 'var(--primary-color)' }}
                  onClick={() => router.push('/auth/forgot-password')}
                >
                  Forgot password?
                </a> */}
              </div>
              <Toast ref={toast} />
              <Button
                label="Sign In"
                className="w-full p-3 text-xl"
                onClick={handleLogin}
              ></Button>
              <Button
                label="Don't have an account yet? Sign Up!"
                severity="secondary"
                className="w-full p-button-secondary p-button-text mt-3"
                onClick={() => router.push('/auth/register')}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
