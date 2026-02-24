import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Modal from '../components/Modal'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  const {
    teacher,
    students,
    projects,
    assignments,
    getAssignmentsForProject,
    updateTeacherName,
    updateStudentName,
    addStudent,
    addProject,
    assignProjectToStudent,
    unassignProject,
    updateAssignmentStatus,
    loginAs,
    updateAssignmentAssessment,
  } = useApp()

  const navigate = useNavigate()

  const [teacherEdit, setTeacherEdit] = useState(false)
  const [teacherName, setTeacherName] = useState(teacher.name)
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showAssign, setShowAssign] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)
  const [newStudentName, setNewStudentName] = useState('')
  const [newStudentEmail, setNewStudentEmail] = useState('')
  const [newProjectTitle, setNewProjectTitle] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [newProjectDue, setNewProjectDue] = useState('')
  const [newStudentPassword, setNewStudentPassword] = useState('')
  const [assignStudentId, setAssignStudentId] = useState('')
  const [assignProjectId, setAssignProjectId] = useState('')
  const [studentError, setStudentError] = useState('')

  const saveTeacher = () => {
    if (teacherName.trim()) {
      updateTeacherName(teacherName.trim())
      setTeacherEdit(false)
    }
  }

  const openEditStudent = (s) => {
    setEditingStudent(s)
    setNewStudentName(s.name)
    setNewStudentEmail(s.email || '')
  }

  const saveStudentEdit = () => {
    if (editingStudent && newStudentName.trim()) {
      updateStudentName(editingStudent.id, newStudentName.trim())
      setEditingStudent(null)
    }
  }

  const handleAddStudent = () => {
    const name = newStudentName.trim()
    const email = newStudentEmail.trim()
    const password = newStudentPassword.trim()

    const isValidEmail = (value) => /.+@.+\..+/.test(value)

    if (!name || !email || !password) {
      setStudentError('Please fill name, email, and password for the student.')
      return
    }
    if (!isValidEmail(email)) {
      setStudentError('Student email is not in a valid format.')
      return
    }
    const duplicate = students.find(
      (s) =>
        s.email?.toLowerCase() === email.toLowerCase() ||
        s.name.trim().toLowerCase() === name.toLowerCase(),
    )
    if (duplicate) {
      setStudentError('A student with this name or email already exists.')
      return
    }

    addStudent({
      name,
      email,
      password,
    })
    setNewStudentName('')
    setNewStudentEmail('')
    setNewStudentPassword('')
    setStudentError('')
    setShowAddStudent(false)
  }

  const handleAddProject = () => {
    if (newProjectTitle.trim()) {
      addProject({
        title: newProjectTitle.trim(),
        description: newProjectDesc.trim() || '',
        dueDate: newProjectDue || '',
      })
      setNewProjectTitle('')
      setNewProjectDesc('')
      setNewProjectDue('')
      setShowAddProject(false)
    }
  }

  const handleAssign = () => {
    if (assignStudentId && assignProjectId) {
      assignProjectToStudent(assignStudentId, assignProjectId)
      setShowAssign(null)
      setAssignStudentId('')
      setAssignProjectId('')
    }
  }

  const getProjectById = (id) => projects.find(p => p.id === id)
  const getStudentById = (id) => students.find(s => s.id === id)

  const handleLogout = () => {
    loginAs(null, null)
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>← Home</Link>
        <div className={styles.headerRight}>
          <h1>Admin Dashboard</h1>
          <button className={styles.btnSecondary} onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Teacher</h2>
        </div>
        <div className={styles.teacherCard}>
          {teacherEdit ? (
            <div className={styles.editRow}>
              <input
                value={teacherName}
                onChange={e => setTeacherName(e.target.value)}
                placeholder="Teacher name"
                className={styles.input}
                autoFocus
              />
              <button className={styles.btnPrimary} onClick={saveTeacher}>Save</button>
              <button className={styles.btnSecondary} onClick={() => setTeacherEdit(false)}>Cancel</button>
            </div>
          ) : (
            <div className={styles.editRow}>
              <div className={styles.teacherMeta}>
                <span className={styles.teacherName}>{teacher.name}</span>
                {teacher.email && <span className={styles.teacherEmail}>{teacher.email}</span>}
              </div>
              <button className={styles.btnSecondary} onClick={() => setTeacherEdit(true)}>Change name</button>
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Students</h2>
          <button className={styles.btnPrimary} onClick={() => setShowAddStudent(true)}>+ Add student</button>
        </div>
        <div className={styles.grid}>
          {students.map((s) => (
            <div key={s.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardTitle}>{s.name}</span>
                <div className={styles.cardActions}>
                  <button className={styles.iconBtn} onClick={() => openEditStudent(s)} title="Edit name">✎</button>
                </div>
              </div>
              {s.email && <p className={styles.muted}>{s.email}</p>}
              <div className={styles.assignmentsPreview}>
                {assignments.filter(a => a.studentId === s.id).length} project(s) assigned
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Projects</h2>
          <button className={styles.btnPrimary} onClick={() => setShowAddProject(true)}>+ Add project</button>
        </div>
        <div className={styles.grid}>
          {projects.map((p) => {
            const projectAssignments = getAssignmentsForProject(p.id)
            return (
              <div key={p.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.cardTitle}>{p.title}</span>
                </div>
                {p.description && <p className={styles.muted}>{p.description}</p>}
                {p.dueDate && <p className={styles.due}>Due: {p.dueDate}</p>}
                <div className={styles.assignedList}>
                  {projectAssignments.map((a) => {
                    const stu = getStudentById(a.studentId)
                    return (
                      <div key={a.studentId} className={styles.assignedRow}>
                        <span>{stu?.name}</span>
                        <select
                          value={a.status}
                          onChange={(e) => updateAssignmentStatus(a.studentId, p.id, e.target.value)}
                          className={styles.select}
                        >
                          <option value="in_progress">In progress</option>
                          <option value="submitted">Submitted</option>
                          <option value="reviewed">Reviewed</option>
                        </select>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className={styles.percentInput}
                          value={a.teacherPercent ?? ''}
                          placeholder="%"
                          onChange={e =>
                            updateAssignmentAssessment(a.studentId, p.id, {
                              teacherPercent: e.target.value === '' ? null : Math.max(0, Math.min(100, Number(e.target.value))),
                            })
                          }
                          title="Teacher progress (%)"
                        />
                        <select
                          className={styles.select}
                          value={a.grade || ''}
                          onChange={e => updateAssignmentAssessment(a.studentId, p.id, { grade: e.target.value })}
                        >
                          <option value="">Grade</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                        <button className={styles.smallBtn} onClick={() => unassignProject(a.studentId, p.id)}>Remove</button>
                      </div>
                    )
                  })}
                </div>
                <button className={styles.btnSecondary} onClick={() => setShowAssign(p.id)}>Assign to student</button>
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Assign project to student (on the spot)</h2>
        </div>
        <div className={styles.quickAssign}>
          <select value={assignStudentId} onChange={e => setAssignStudentId(e.target.value)} className={styles.select}>
            <option value="">Select student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={assignProjectId} onChange={e => setAssignProjectId(e.target.value)} className={styles.select}>
            <option value="">Select project</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <button
            className={styles.btnPrimary}
            disabled={!assignStudentId || !assignProjectId}
            onClick={() => assignStudentId && assignProjectId && assignProjectToStudent(assignStudentId, assignProjectId)}
          >
            Assign
          </button>
        </div>
      </section>

      {/* Modals */}
      <Modal show={showAddStudent} onClose={() => setShowAddStudent(false)} title="Add student">
        <div className={styles.form}>
          <input
            value={newStudentName}
            onChange={e => setNewStudentName(e.target.value)}
            placeholder="Student name"
            className={styles.input}
          />
          <input
            value={newStudentEmail}
            onChange={e => setNewStudentEmail(e.target.value)}
            placeholder="Student email"
            className={styles.input}
            type="email"
          />
          <input
            value={newStudentPassword}
            onChange={e => setNewStudentPassword(e.target.value)}
            placeholder="Temporary password"
            className={styles.input}
            type="password"
          />
          {studentError && <p className={styles.muted}>{studentError}</p>}
          <button className={styles.btnPrimary} onClick={handleAddStudent}>Add</button>
        </div>
      </Modal>

      <Modal show={showAddProject} onClose={() => setShowAddProject(false)} title="Add project">
        <div className={styles.form}>
          <input value={newProjectTitle} onChange={e => setNewProjectTitle(e.target.value)} placeholder="Project title" className={styles.input} />
          <textarea value={newProjectDesc} onChange={e => setNewProjectDesc(e.target.value)} placeholder="Description (optional)" className={styles.input} rows={2} />
          <input value={newProjectDue} onChange={e => setNewProjectDue(e.target.value)} placeholder="Due date (optional)" className={styles.input} type="date" />
          <button className={styles.btnPrimary} onClick={handleAddProject}>Add</button>
        </div>
      </Modal>

      <Modal show={!!showAssign} onClose={() => setShowAssign(null)} title="Assign to student">
        <div className={styles.form}>
          <select value={assignStudentId} onChange={e => setAssignStudentId(e.target.value)} className={styles.select}>
            <option value="">Select student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <p className={styles.muted}>Project: {getProjectById(showAssign)?.title}</p>
          <button
            className={styles.btnPrimary}
            disabled={!assignStudentId}
            onClick={() => {
              if (assignStudentId && showAssign) {
                assignProjectToStudent(assignStudentId, showAssign)
                setShowAssign(null)
                setAssignStudentId('')
              }
            }}
          >
            Assign
          </button>
        </div>
      </Modal>

      <Modal show={!!editingStudent} onClose={() => setEditingStudent(null)} title="Change student name">
        <div className={styles.form}>
          <input value={newStudentName} onChange={e => setNewStudentName(e.target.value)} placeholder="Student name" className={styles.input} />
          <button className={styles.btnPrimary} onClick={saveStudentEdit}>Save</button>
        </div>
      </Modal>
    </div>
  )
}
