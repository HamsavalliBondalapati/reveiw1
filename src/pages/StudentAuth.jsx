import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f0f12',
    color: '#f0f0f4',
    padding: 24,
  },
  card: {
    background: '#18181d',
    border: '1px solid #2d2d35',
    borderRadius: 12,
    padding: 32,
    maxWidth: 460,
    width: '100%',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  subtitle: {
    color: '#8b8b96',
    fontSize: '0.9rem',
    marginBottom: 24,
  },
  label: {
    fontSize: '0.85rem',
    marginBottom: 4,
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #2d2d35',
    background: '#0f0f12',
    color: '#f0f0f4',
    marginBottom: 14,
    fontSize: '0.95rem',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px 18px',
    borderRadius: 8,
    border: 'none',
    background: '#6366f1',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 4,
  },
  error: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginTop: 8,
  },
  note: {
    color: '#8b8b96',
    fontSize: '0.85rem',
    marginTop: 12,
  },
}

export default function StudentAuth() {
  const navigate = useNavigate()
  const { students, loginAs } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isValidEmail = (value) => /.+@.+\..+/.test(value)

  const handleLogin = () => {
    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    const student = students.find(
      (s) => s.email?.toLowerCase() === email.trim().toLowerCase() && s.password === password.trim(),
    )
    if (!student) {
      setError('Invalid email or password. Ask your teacher to confirm your credentials.')
      return
    }
    setError('')
    loginAs('student', student.id)
    navigate('/student')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student sign in</h1>
        <p style={styles.subtitle}>Use the email and password your teacher gave you.</p>

        {students.length === 0 && (
          <p style={styles.note}>
            No students yet. Ask your teacher to sign in and add students from the admin dashboard.
          </p>
        )}

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="student@example.com"
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Your password"
        />

        <button
          type="button"
          style={styles.primaryBtn}
          onClick={handleLogin}
          disabled={!email.trim() || !password.trim()}
        >
          Continue to my projects
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  )
}

