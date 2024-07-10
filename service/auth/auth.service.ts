import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { eraseCookie, setCookie } from '@/helpers/cookies'
import { useRouter } from 'next/navigation'
import { BASEURL } from '../../superman.json'

export const useAuthService = () => {
  const toast = useRef<Toast>(null)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    token: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleLogin = async () => {
    const response = await fetch(`${BASEURL}/auth/login`, {
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
    const response = await fetch(`${BASEURL}/auth/register`, {
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

      setInterval(() => {
        router.push('/auth/login')
      }, 2000)
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
    toast.current?.show({
      severity: 'success',
      summary: 'success',
      detail: 'Success logout account',
      life: 2000
    })

    eraseCookie('token')
    setInterval(() => {
      router.push('/auth/login')
    }, 2000)
  }

  const handleForgotPassword = async () => {
    const response = await fetch(`${BASEURL}/auth/forgot-password`, {
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
        life: 2000
      })

      setInterval(() => {
        router.push('/auth/login')
      }, 2000)
    } else {
      toast.current?.show({
        severity: 'error',
        summary: result.error,
        detail: result.message,
        life: 5000
      })
    }
  }

  const handleResetPassword = async () => {
    if (formData.password !== formData.confirm_password) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords do not match',
        life: 5000
      })
      return
    }

    const response = await fetch(`${BASEURL}/auth/reset-password`, {
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
        life: 2000
      })

      setInterval(() => {
        router.push('/auth/login')
      }, 2000)
    } else {
      toast.current?.show({
        severity: 'error',
        summary: result.error,
        detail: result.message,
        life: 5000
      })
    }
  }

  return {
    toast,
    formData,
    setFormData,
    handleChange,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleResetPassword
  }
}
