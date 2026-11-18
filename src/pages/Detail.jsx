import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TodoModal from '../components/TodoModal'

export default function Detail({ todos, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showEdit, setShowEdit] = useState(false)

  const todo = todos.find((t) => t.id === Number(id))

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-sm">Tugas tidak ditemukan.</p>
        <Link
          to="/"
          className="rounded bg-red-600 px-3 py-1 text-xs text-white"
        >
          Kembali
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="grid w-[600px] max-w-[94%] grid-cols-[1.4fr_1fr] gap-6 rounded-lg border border-gray-100 p-5 shadow-sm">
        <div>
          <h3 className="text-sm font-bold">Judul</h3>
          <p className="mb-3 text-[11px]">{todo.title}</p>
          <h3 className="text-sm font-bold">Deskripsi</h3>
          <div className="mt-1 h-24 rounded border border-gray-300 p-2 text-[11px]">
            {todo.description}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold">Status</h3>
          <p className="mb-2 text-[11px]">{todo.status}</p>
          <h3 className="text-sm font-bold">Prioritas</h3>
          <p className="mb-2 text-[11px]">{todo.priority}</p>
          <h3 className="text-sm font-bold">Deadline</h3>
          <p className="mb-3 text-[11px]">{todo.deadline}</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="rounded bg-red-600 px-3 py-1 text-[11px] text-white hover:bg-red-700"
            >
              Kembali
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="rounded bg-blue-600 px-3 py-1 text-[11px] text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          heading="Update Todo"
          submitLabel="Update"
          initialData={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            onUpdate(todo.id, data)
            setShowEdit(false)
          }}
        />
      )}
    </div>
  )
}