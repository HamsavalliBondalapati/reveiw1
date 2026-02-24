import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

// Initial data – one sample student, teacher name/email/password can be set on login
const defaultTeacher = { id: 't1', name: 'Teacher', email: '', password: '' }
const defaultStudents = [
  { id: 's1', name: 'Student 1', email: 'student1@example.com', password: 'student1' },
]
const defaultProjects = [
  { id: 'p1', title: 'Web App Development', description: 'Build a full-stack web application', dueDate: '2025-03-15' },
  { id: 'p2', title: 'Data Science Report', description: 'Analyze dataset and present findings', dueDate: '2025-03-20' },
  { id: 'p3', title: 'Mobile Prototype', description: 'Design and prototype a mobile app', dueDate: '2025-03-25' },
]

export function AppProvider({ children }) {
  const [role, setRole] = useState(null) // 'admin' | 'student'
  const [currentUserId, setCurrentUserId] = useState(null)
  const [teacher, setTeacher] = useState(defaultTeacher)
  const [students, setStudents] = useState(defaultStudents)
  const [projects, setProjects] = useState(defaultProjects)
  const [assignments, setAssignments] = useState([]) // { studentId, projectId, status, submittedAt, teacherPercent, grade, feedback }
  const [tasks, setTasks] = useState({}) // projectId -> [{ id, title, assigneeId, done }]

  const updateTeacherName = useCallback((name) => {
    setTeacher(prev => ({ ...prev, name }))
  }, [])

  const updateTeacherProfile = useCallback(({ name, email, password }) => {
    setTeacher(prev => ({
      ...prev,
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(password !== undefined ? { password } : {}),
    }))
  }, [])

  const addStudent = useCallback((student) => {
    const id = 's' + (Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 6)
    setStudents(prev => [...prev, { ...student, id }])
    return id
  }, [])

  const updateStudentName = useCallback((id, name) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, name } : s))
  }, [])

  const removeStudent = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    setAssignments(prev => prev.filter(a => a.studentId !== id))
  }, [])

  const addProject = useCallback((project) => {
    const id = 'p' + (Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 6)
    setProjects(prev => [...prev, { ...project, id }])
    return id
  }, [])

  const assignProjectToStudent = useCallback((studentId, projectId) => {
    const exists = assignments.some(a => a.studentId === studentId && a.projectId === projectId)
    if (exists) return
    setAssignments(prev => [...prev, {
      studentId,
      projectId,
      status: 'in_progress',
      submittedAt: null,
      teacherPercent: null,
      grade: '',
      feedback: '',
    }])
  }, [assignments])

  const unassignProject = useCallback((studentId, projectId) => {
    setAssignments(prev => prev.filter(a => !(a.studentId === studentId && a.projectId === projectId)))
  }, [])

  const getAssignmentsForStudent = useCallback((studentId) => {
    return assignments.filter(a => a.studentId === studentId)
  }, [assignments])

  const getAssignmentsForProject = useCallback((projectId) => {
    return assignments.filter(a => a.projectId === projectId)
  }, [assignments])

  const updateAssignmentStatus = useCallback((studentId, projectId, status, submittedAt = null) => {
    setAssignments(prev => prev.map(a =>
      a.studentId === studentId && a.projectId === projectId
        ? { ...a, status, submittedAt: submittedAt || a.submittedAt }
        : a
    ))
  }, [])

  const updateAssignmentAssessment = useCallback((studentId, projectId, { teacherPercent, grade, feedback }) => {
    setAssignments(prev => prev.map(a => {
      if (a.studentId === studentId && a.projectId === projectId) {
        return {
          ...a,
          ...(teacherPercent !== undefined ? { teacherPercent } : {}),
          ...(grade !== undefined ? { grade } : {}),
          ...(feedback !== undefined ? { feedback } : {}),
        }
      }
      return a
    }))
  }, [])

  const addTaskToProject = useCallback((projectId, task) => {
    const id = 'task-' + Date.now()
    setTasks(prev => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), { ...task, id, done: false }]
    }))
  }, [])

  const toggleTask = useCallback((projectId, taskId) => {
    setTasks(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || []).map(t => t.id === taskId ? { ...t, done: !t.done } : t)
    }))
  }, [])

  const loginAs = useCallback((r, userId = null) => {
    setRole(r)
    setCurrentUserId(userId)
  }, [])

  const value = {
    role,
    currentUserId,
    teacher,
    students,
    projects,
    assignments,
    tasks,
    setTasks,
    updateTeacherName,
    updateTeacherProfile,
    addStudent,
    updateStudentName,
    removeStudent,
    addProject,
    assignProjectToStudent,
    unassignProject,
    getAssignmentsForStudent,
    getAssignmentsForProject,
    updateAssignmentStatus,
    updateAssignmentAssessment,
    addTaskToProject,
    toggleTask,
    loginAs,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
