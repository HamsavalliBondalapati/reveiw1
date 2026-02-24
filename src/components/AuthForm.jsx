import React, { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function AuthForm({ role, mode, onSubmit, submitError }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = { email: '', password: '' }

    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address (for example: name@example.com).'
    }
    if (!form.password || form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters long.'
    }

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors)
      return
    }

    if (onSubmit) {
      onSubmit({ ...form })
    }
  }

  const titleRole = role === 'teacher' ? 'Teacher' : 'Student'
  const title =
    (mode === 'login' ? 'Login' : 'Sign up') + ' as ' + titleRole

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}
    >
      <h2
        style={{
          fontSize: '1.4rem',
          marginBottom: '0.25rem',
        }}
      >
        {title}
      </h2>

      {submitError && (
        <div
          style={{
            background: '#451a1a',
            border: '1px solid #f97373',
            color: '#fecaca',
            padding: '0.6rem 0.75rem',
            borderRadius: '0.75rem',
            fontSize: '0.9rem',
          }}
        >
          {submitError}
        </div>
      )}

      <div style={{ textAlign: 'left' }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            borderRadius: '0.75rem',
            border: errors.email ? '1px solid #f97373' : '1px solid #374151',
            background: '#020617',
            color: '#e5e7eb',
            outline: 'none',
          }}
        />
        {errors.email && (
          <p
            style={{
              color: '#fecaca',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
            }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ textAlign: 'left' }}>
        <label
          htmlFor="password"
          style={{
            display: 'block',
            marginBottom: '0.25rem',
            fontWeight: 500,
            fontSize: '0.95rem',
          }}
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            borderRadius: '0.75rem',
            border: errors.password ? '1px solid #f97373' : '1px solid #374151',
            background: '#020617',
            color: '#e5e7eb',
            outline: 'none',
          }}
        />
        {errors.password && (
          <p
            style={{
              color: '#fecaca',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
            }}
          >
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '999px',
          border: 'none',
          background:
            mode === 'login'
              ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
              : 'linear-gradient(135deg, #ec4899, #f97316)',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}
      >
        {mode === 'login' ? 'Login' : 'Sign up'}
      </button>
    </form>
  )
}

