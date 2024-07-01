/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);

  const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

  const registerUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Tambahkan event handler untuk mengubah nilai email
  const handleEmailChange = (e: any) => {
    setFormData({ ...formData, email: e.target.value });
  };

  // Tambahkan event handler untuk mengubah nilai password
  const handlePasswordChange = (e: any) => {
    console.log(e.target.value);
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
          }}
        >
          <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
            <div className="text-center mb-5">
              <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
              <div className="text-900 text-3xl font-medium mb-3">REGISTER</div>
            </div>

            <div>
              <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                Email
              </label>
              <InputText id="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} onChange={handleEmailChange} />

              <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                Password
              </label>
              <Password inputId="password1" onChange={handlePasswordChange} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                  Forgot password?
                </a>
              </div>
              <Button label="Register" className="w-full p-3 text-xl" onClick={registerUser}></Button>
              <Button label="Login" severity="secondary" text className="w-full p-3 text-xl mt-2" onClick={() => router.push('/auth/login')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
