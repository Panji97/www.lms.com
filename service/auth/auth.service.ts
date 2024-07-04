import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { eraseCookie, setCookie } from '@/helpers/cookies'
import { useRouter } from 'next/navigation'

export const useAuthService = () => {
  const toast = useRef<Toast>(null)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const result = await response.json()

    if (response.ok) {
      setCookie('token', result.data.access_token, 7)
      toast.current?.show({
        severity: 'success',
        summary: result.message,
        detail: result.detail,
        life: 3000
      })

      router.push('/')
    } else {
      toast.current?.show({
        severity: 'error',
        summary: result.error,
        detail: result.message,
        life: 5000
      })
    }
  }

  const handleRegister = async () => {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const result = await response.json()

    if (response.ok) {
      toast.current?.show({
        severity: 'success',
        summary: result.message,
        detail: result.detail,
        life: 5000
      })

      router.push('/auth/login')
    } else {
      toast.current?.show({
        severity: 'error',
        summary: result.error,
        detail: result.message,
        life: 5000
      })
    }
  }

  const handleLogout = async () => {
    eraseCookie('token')
    router.push('/auth/login')
  }

  const handleForgotPassword = async () => {
    console.log('mantab')
  }

  return {
    toast,
    formData,
    handleChange,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword
  }
}
