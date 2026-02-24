import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          padding: '2rem',
          background: '#0f0f12',
          color: '#f0f0f4',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h1 style={{ marginBottom: '1rem' }}>Something went wrong</h1>
          <pre style={{
            background: '#222',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
          }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
