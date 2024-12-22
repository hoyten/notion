import { deleteNote, editNote, getNote, getNotes, saveNote } from "../../api/notesApi"

  export const fetchNotes = (userId) => async (dispatch) => {
    dispatch({ type: "NOTE/FETCH/START" })
  
    try {
      const notes = await getNotes(userId)
      dispatch({ type: "NOTE/FETCH/SUCCESS", payload: notes })
    } catch (error) {
      dispatch({ type: "NOTE/FETCH/ERROR", payload: error.message })
    }
  }
  
  export const fetchNote = (userId, id) => async (dispatch) => {
    dispatch({ type: "NOTE/DETAIL/FETCH/START" })
  
    try {
      const note = await getNote(userId, id)
      dispatch({ type: "NOTE/DETAIL/FETCH/SUCCESS", payload: note })
    } catch (error) {
      dispatch({ type: "NOTE/DETAIL/FETCH/ERROR", payload: error.message })
    }
  }
  
  export const createNote = (note) => async (dispatch) => {
    dispatch({ type: "NOTE/CREATE/START" })
  
    try {
      const newNote = await saveNote(note)
      dispatch({ type: "NOTE/CREATE/SUCCESS", payload: newNote })
    } catch (error) {
      dispatch({ type: "NOTE/CREATE/ERROR", payload: error.message })
    }
  }
  
  export const updateNote = (noteId, updatedFields) => async (dispatch) => {
    dispatch({ type: "NOTE/UPDATE/START" })
  
    try {
      const updatedNote = await editNote(updatedFields, { id: noteId })
      dispatch({ type: "NOTE/UPDATE/SUCCESS", payload: updatedNote })
    } catch (error) {
      dispatch({ type: "NOTE/UPDATE/ERROR", payload: error.message })
    }
  }
  
  export const deleteNoteAction = (noteId) => async (dispatch) => {
    dispatch({ type: "NOTE/DELETE/START" })
  
    try {
      await deleteNote(noteId)
      dispatch({ type: "NOTE/DELETE/SUCCESS", payload: noteId })
    } catch (error) {
      dispatch({ type: "NOTE/DELETE/ERROR", payload: error.message })
    }
  }
  