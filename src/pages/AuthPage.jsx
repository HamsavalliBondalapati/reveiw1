import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AuthForm from '../components/AuthForm'

export default function AuthPage() {
  const { role } = useParams() // "teacher" or "student"
  const navigate = useNavigate()
  const { students, addStudent, loginAs } = useApp()
  const [mode, setMode] = useState('login')
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = ({ email }) => {
    setSubmitError('')
    const trimmedEmail = email.trim().toLowerCase()

    if (role === 'teacher') {
      // For demo purposes any valid email/password logs in the teacher.
      loginAs('admin')
      navigate('/admin')
      return
    }

    if (role === 'student') {
      if (mode === 'login') {
        const existing = students.find(
          (s) => (s.email || '').toLowerCase() === trimmedEmail,
        )
        if (!existing) {
          setSubmitError('No student found with this email. Please sign up first.')
          return
        }
        loginAs('student', existing.id)
        navigate('/student')
      } else {
        const nameFromEmail = trimmedEmail.split('@')[0] || 'New Student'
        const newId = addStudent({
          name: nameFromEmail,
          email: trimmedEmail,
        })
        loginAs('student', newId)
        navigate('/student')
      }
    }
  }

  const titleRole = role === 'teacher' ? 'Teacher' : 'Student'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #1e293b, #020617 55%)',
        color: '#e5e7eb',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          background:
            'linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))',
          borderRadius: '1.5rem',
          border: '1px solid rgba(148,163,184,0.2)',
          boxShadow:
            '0 20px 40px rgba(15,23,42,0.75), 0 0 0 1px rgba(15,23,42,0.6)',
          padding: '2rem 2.25rem 2.25rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                margin: 0,
              }}
            >
              Student Project Portal
            </p>
            <h1
              style={{
                fontSize: '1.5rem',
                margin: '0.3rem 0 0',
              }}
            >
              {titleRole} access
            </h1>
          </div>
          <Link
            to="/"
            style={{
              fontSize: '0.8rem',
              color: '#9ca3af',
              textDecoration: 'none',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.4)',
            }}
          >
            ← Home
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            background: '#020617',
            borderRadius: '999px',
            border: '1px solid rgba(31,41,55,0.9)',
            padding: '0.18rem',
            marginBottom: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '0.45rem 0.6rem',
              borderRadius: '999px',
              border: 'none',
              background: mode === 'login' ? '#111827' : 'transparent',
              color: '#e5e7eb',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '0.45rem 0.6rem',
              borderRadius: '999px',
              border: 'none',
              background: mode === 'signup' ? '#111827' : 'transparent',
              color: '#e5e7eb',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Sign up
          </button>
        </div>

        <AuthForm
          role={role === 'teacher' ? 'teacher' : 'student'}
          mode={mode}
          onSubmit={handleSubmit}
          submitError={submitError}
        />
      </div>
    </div>
  )
}

