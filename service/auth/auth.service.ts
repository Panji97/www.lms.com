import React, { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { toastMessage } from '../master/message.service'

export const useAuthService = () => {
  const toast = useRef<Toast>(null)
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

    const data = await response.json()

    toastMessage(toast, 'success', data.message, 'success', 3000)
  }

  const handleRegister = async () => {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await response.json()

    console.log(data)
  }

  return { toast, formData, handleChange, handleLogin, handleRegister }
}
