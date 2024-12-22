import { useEffect } from 'react'
import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/user/selectors'
import { selectAllNotes, selectErrorNote, selectLoadingNotes } from '../redux/notes/selectors'
import { deleteNoteAction, fetchNotes } from '../redux/notes/action'



export const loader = ({ params: { userId } }) => {
  return { userId }
}

export default function Notes() {
  const { userId } = useLoaderData()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectUser)
  const notes = useSelector(selectAllNotes)
  const loading = useSelector(selectLoadingNotes)
  const error = useSelector(selectErrorNote)

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotes(userId))
    }
  }, [dispatch, userId])

  const handleDelete = async (noteId) => {
    try {
      await dispatch(deleteNoteAction(noteId))
      navigate(0)
    } catch (error) {
      alert('Error deleting note')
    }
  }

  if (loading) {
    return <div>Loading notes...</div>
  }

  if (error) {
    return <div>Error loading notes: {error}</div>
  }

  return (
    <div className="flex flex-col flex-1 my-10 items-center">
      <p className="text-5xl">Notes</p>
      <button
        onClick={() => navigate(`/users/${user.id}/notes/create`)}
        className="bg-[#800000] py-3 px-16 text-2xl mt-8 mb-6 text-white rounded-md cursor-pointer hover:bg-[#660000] transition-all duration-300"
      >
        Add new note
      </button>

      <div className="flex flex-col gap-2 min-w-full">
        {notes.length === 0 ? (
          <div className="text-center text-xl text-gray-500">No notes available</div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex bg-gray-200 p-3 items-center space-between"
            >
              <div className="flex flex-1 gap-3">
                <Link to={`/users/${note.userId}/notes/${note.id}`}>
                  <span className="text-xl">{note.title}</span>
                  <span className="text-xl text-gray-500">{note.createdAt.slice(0, 10)}</span>
                </Link>
              </div>
              <div className="flex gap-3">
                <Link to={`/users/${note.userId}/notes/${note.id}/edit`}>
                  <img
                    className="cursor-pointer z-2"
                    src="https://cdn-icons-png.flaticon.com/16/1828/1828911.png"
                    alt="Edit"
                  />
                </Link>
                <img
                  className="cursor-pointer z-2"
                  src="https://cdn-icons-png.flaticon.com/16/542/542724.png"
                  alt="Delete"
                  onClick={() => handleDelete(note.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
