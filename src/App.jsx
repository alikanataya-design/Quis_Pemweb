import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { dummyTodos } from './data/dummyTodos'
import Home from './pages/Home'
import Detail from './pages/Detail'

export default function App() {
  const [todos, setTodos] = useState(dummyTodos)
  const [toast, setToast] = useState('')

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 2500)
  }

  const addTodo = (data) => {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos((prev) => [...prev, { id: newId, ...data }])
    showToast('Tugas berhasil ditambahkan')
  }

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
    showToast('Tugas berhasil diperbarui')
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
    showToast('Tugas berhasil dihapus')
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home todos={todos} onAdd={addTodo} onDelete={deleteTodo} />}
        />
        <Route
          path="/todo/:id"
          element={<Detail todos={todos} onUpdate={updateTodo} />}
        />
      </Routes>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] rounded bg-gray-900 px-4 py-2 text-xs text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  )
}