import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNote } from '../../redux/notes/action'
import { DATE } from '../../constants'
import { selectUser } from '../../redux/user/selectors'

export default function CreateNote() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const handleBodyChange = useCallback((e) => {
    setBody(e.target.value)
  }, [])

  const handleSave = () => {
    const newNote = {
      userId: user.id,
      title,
      body,
      createdAt: DATE,
    }
    dispatch(createNote(newNote))
    navigate(`/users/${user.id}/notes`)
  }

  return (
    <div className="min-w-full flex flex-col gap-10">
      <div className="mt-8 flex items-center">
        <Link to="..">
          <button className="bg-gray-200 py-1 px-4">Back</button>
        </Link>
        <p className="text-5xl grow text-center mr-16">Create new note</p>
      </div>
      <div className="flex flex-col gap-4 grow">
        <textarea
          onChange={handleTitleChange}
          type="text"
          value={title}
          className="bg-gray-200 pt-4 px-2"
        />
        <textarea
          onChange={handleBodyChange}
          type="text"
          value={body}
          className="grow bg-gray-200 break-words pt-4 px-2"
        />
      </div>
      <button
        className="bg-gray-200 py-4 px-16 text-2xl cursor-pointer"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  )
}
