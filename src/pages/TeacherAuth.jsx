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
}

export default function TeacherAuth() {
  const navigate = useNavigate()
  const { updateTeacherProfile, loginAs } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isValidEmail = (value) => /.+@.+\..+/.test(value)

  const handleContinue = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in name, email, and password.')
      return
    }
    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    updateTeacherProfile({ name: name.trim(), email: email.trim(), password: password.trim() })
    loginAs('admin', null)
    navigate('/admin')
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Teacher sign in</h1>
        <p style={styles.subtitle}>Log in as the teacher using your name, email, and password. Then you can add students and projects.</p>

        <label style={styles.label}>Teacher name *</label>
        <input
          style={styles.input}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Dr. Hamsa"
        />

        <label style={styles.label}>Email *</label>
        <input
          style={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label style={styles.label}>Password *</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter a password"
        />

        <button
          type="button"
          style={styles.primaryBtn}
          onClick={handleContinue}
          disabled={!name.trim() || !email.trim() || !password.trim()}
        >
          Continue to admin
        </button>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: 8 }}>{error}</p>
        )}
      </div>
    </div>
  )
}

