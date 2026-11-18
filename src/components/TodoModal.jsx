import { useState } from 'react'

const STATUS_OPTIONS = ['to-do', 'in progress', 'done']
const PRIORITY_OPTIONS = ['low', 'medium', 'high']

const inputClass =
  'w-full rounded border border-indigo-200 px-2 py-1 text-xs outline-none focus:border-blue-500'

export default function TodoModal({
  heading,
  submitLabel,
  initialData,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState(
    initialData ?? {
      title: '',
      description: '',
      status: 'to-do',
      priority: 'low',
      deadline: '',
    },
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.deadline) {
      alert('Judul dan Deadline wajib diisi!')
      return
    }
    onSubmit({ ...form, title: form.title.trim() })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-[420px] max-w-[92%] rounded bg-white p-4 shadow-lg"
      >
        <h2 className="mb-2 text-center text-sm font-bold">{heading}</h2>

        <label className="text-xs font-bold">Judul</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={`${inputClass} mb-3 mt-1`}
        />

        <label className="text-xs font-bold">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={`${inputClass} mb-3 mt-1`}
        />

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`${inputClass} mt-1`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold">Prioritas</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={`${inputClass} mt-1`}
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="text-xs font-bold">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className={`${inputClass} mb-4 mt-1`}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-600 py-1 text-xs text-white hover:bg-red-700"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 py-1 text-xs text-white hover:bg-blue-600"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}