import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import styles from './StudentDashboard.module.css'

export default function StudentDashboard() {
  const {
    currentUserId,
    students,
    projects,
    tasks,
    getAssignmentsForStudent,
    updateAssignmentStatus,
    addTaskToProject,
    toggleTask,
    loginAs,
  } = useApp()

  const navigate = useNavigate()

  const [newTaskTitle, setNewTaskTitle] = useState({})
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const student = students.find(s => s.id === currentUserId)
  const myAssignments = getAssignmentsForStudent(currentUserId) || []

  const getProject = (id) => projects.find(p => p.id === id)
  const projectTasks = (projectId) => tasks[projectId] || []

  const handleAddTask = (projectId) => {
    const title = (newTaskTitle[projectId] || '').trim()
    if (!title) return
    addTaskToProject(projectId, { title, assigneeId: currentUserId })
    setNewTaskTitle(prev => ({ ...prev, [projectId]: '' }))
  }

  const handleSubmit = (projectId) => {
    updateAssignmentStatus(currentUserId, projectId, 'submitted', new Date().toISOString().slice(0, 10))
  }

  const handleLogout = () => {
    loginAs(null, null)
    navigate('/')
  }

  if (!student) {
    return (
      <div className={styles.page}>
        <p>Student not found. <Link to="/">Go home</Link></p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.back}>← Home</Link>
        <div className={styles.headerRight}>
          <div>
            <h1>Student Dashboard</h1>
            <p className={styles.subtitle}>Logged in as <strong>{student.name}</strong></p>
          </div>
          <button className={styles.btnSecondary} onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <section className={styles.section}>
        <h2>My projects & milestones</h2>
        <div className={styles.projectList}>
          {myAssignments.length === 0 ? (
            <div className={styles.empty}>
              <p>No projects assigned yet. Ask your teacher to assign you a project.</p>
            </div>
          ) : (
            myAssignments.map((a) => {
              const project = getProject(a.projectId)
              if (!project) return null
              const projectTaskList = projectTasks(a.projectId)
              const doneCount = projectTaskList.filter(t => t.done).length
              const percent = projectTaskList.length
                ? Math.round((100 * doneCount) / projectTaskList.length)
                : 0
              return (
                <div key={a.projectId} className={styles.projectCard}>
                  <div className={styles.projectHead}>
                    <h3>{project.title}</h3>
                    <span className={styles.statusBadge} data-status={a.status}>{a.status.replace('_', ' ')}</span>
                  </div>
                  {project.description && <p className={styles.muted}>{project.description}</p>}
                  {project.dueDate && <p className={styles.due}>Due: {project.dueDate}</p>}

                  <div className={styles.milestoneBar}>
                    <span>Progress: {percent}% · Tasks {doneCount} / {projectTaskList.length}</span>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: projectTaskList.length ? (100 * doneCount / projectTaskList.length) + '%' : '0%' }}
                      />
                    </div>
                  </div>

                  <ul className={styles.taskList}>
                    {projectTaskList.map((t) => (
                      <li key={t.id} className={styles.taskItem}>
                        <label>
                          <input
                            type="checkbox"
                            checked={t.done}
                            onChange={() => toggleTask(a.projectId, t.id)}
                          />
                          <span className={t.done ? styles.done : ''}>{t.title}</span>
                        </label>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.addTask}>
                    <input
                      value={newTaskTitle[a.projectId] || ''}
                      onChange={e => setNewTaskTitle(prev => ({ ...prev, [a.projectId]: e.target.value }))}
                      placeholder="Add a task..."
                      className={styles.input}
                      onKeyDown={e => e.key === 'Enter' && handleAddTask(a.projectId)}
                    />
                    <button className={styles.btnSecondary} onClick={() => handleAddTask(a.projectId)}>Add task</button>
                  </div>

                  {a.status === 'in_progress' && (
                    <button className={styles.submitBtn} onClick={() => handleSubmit(a.projectId)}>
                      Submit project
                    </button>
                  )}
                  {a.submittedAt && <p className={styles.submitted}>Submitted on {a.submittedAt}</p>}

                  <button
                    className={styles.btnSecondary}
                    style={{ marginTop: 8 }}
                    onClick={() => setSelectedProjectId(a.projectId)}
                  >
                    View project details
                  </button>
                </div>
              )
            })
          )}
        </div>

        {myAssignments.length > 0 && (
          <div className={styles.projectDetails}>
            {(() => {
              const activeId = selectedProjectId || myAssignments[0]?.projectId
              const assignment = myAssignments.find(a => a.projectId === activeId)
              const project = assignment ? getProject(assignment.projectId) : null
              const projectTaskList = project ? projectTasks(project.id) : []
              const doneCount = projectTaskList.filter(t => t.done).length
              const percent = projectTaskList.length
                ? Math.round((100 * doneCount) / projectTaskList.length)
                : 0

              if (!project) return null

              return (
                <div className={styles.detailsCard}>
                  <h3>{project.title}</h3>
                  {project.description && <p className={styles.muted}>{project.description}</p>}
                  {project.dueDate && <p className={styles.due}>Due date: {project.dueDate}</p>}
                  <p className={styles.muted}>
                    Overall progress: <strong>{percent}%</strong> ({doneCount} of {projectTaskList.length} tasks complete)
                  </p>
                  {typeof assignment.teacherPercent === 'number' && (
                    <p className={styles.muted}>
                      Teacher progress: <strong>{assignment.teacherPercent}%</strong>
                    </p>
                  )}
                  {assignment.grade && (
                    <p className={styles.muted}>
                      Teacher grade: <strong>{assignment.grade}</strong>
                    </p>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </section>
    </div>
  )
}
