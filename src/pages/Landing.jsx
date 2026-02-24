import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    padding: 40,
    maxWidth: 420,
    width: '100%',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: 8,
    color: '#f0f0f4',
  },
  subtitle: {
    color: '#8b8b96',
    fontSize: '0.95rem',
    marginBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#8b8b96',
    marginBottom: 12,
  },
  primaryBtn: {
    width: '100%',
    padding: '14px 20px',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
  },
  studentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  studentBtn: {
    width: '100%',
    padding: '12px 16px',
    background: '#222228',
    border: '1px solid #2d2d35',
    borderRadius: 8,
    color: '#f0f0f4',
    fontSize: '0.95rem',
    textAlign: 'left',
    cursor: 'pointer',
  },
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Group Projects</h1>
        <p style={styles.subtitle}>Manage group projects, tasks, and submissions</p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Choose your role</h2>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/auth/teacher')}
            type="button"
          >
            Teacher / Admin
          </button>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Or continue as student</h2>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/auth/student')}
            type="button"
          >
            Student
          </button>
        </div>
      </div>
    </div>
  )
}
