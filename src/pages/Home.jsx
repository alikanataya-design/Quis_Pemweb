import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Trash2 } from 'lucide-react'
import TodoModal from '../components/TodoModal'

export default function Home({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false)

  const handleDelete = (todo) => {
    if (window.confirm(`Yakin ingin menghapus tugas "${todo.title}"?`)) {
      onDelete(todo.id)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
        >
          Tambah Todo
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-3 py-2 text-xs font-bold">
        <span>Judul</span>
        <span>Status</span>
        <span>Prioritas</span>
        <span>Deadline</span>
        <span className="text-center">Aksi</span>
      </div>

      <div className="rounded border border-gray-100 shadow-sm">
        {todos.length === 0 && (
          <p className="p-6 text-center text-xs text-gray-500">
            Belum ada tugas. Klik "Tambah Todo" untuk menambahkan.
          </p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-gray-100 px-3 py-3 text-[11px] last:border-b-0"
          >
            <span className="max-w-[200px] truncate">{todo.title}</span>
            <span>{todo.status}</span>
            <span>{todo.priority}</span>
            <span>{todo.deadline}</span>
            <span className="flex justify-center gap-1">
              <Link
                to={`/todo/${todo.id}`}
                title="Lihat detail"
                className="rounded bg-blue-600 p-1.5 text-white hover:bg-blue-700"
              >
                <Eye size={13} />
              </Link>
              <button
                onClick={() => handleDelete(todo)}
                title="Hapus"
                className="rounded bg-red-600 p-1.5 text-white hover:bg-red-700"
              >
                <Trash2 size={13} />
              </button>
            </span>
          </div>
        ))}
      </div>

      {showAdd && (
        <TodoModal
          heading="Tambah Todo"
          submitLabel="Tambah"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            onAdd(data)
            setShowAdd(false)
          }}
        />
      )}
    </div>
  )
}