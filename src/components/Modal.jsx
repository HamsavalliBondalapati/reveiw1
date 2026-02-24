import React from 'react'
import styles from './Modal.module.css'

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={onClose}>×</button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
