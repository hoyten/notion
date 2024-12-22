const initialState = {
  loading: false,
  notes: [],
  note: null,
  error: null,
}

export const noteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "NOTE/FETCH/START":
      return { ...state, error: null, loading: true }
    case "NOTE/FETCH/SUCCESS":
      return { ...state, notes: payload, loading: false }
    case "NOTE/FETCH/ERROR":
      return { ...state, loading: false, error: payload }
    case "NOTE/POST/SUCCESS":
      return { ...state, loading: false }
    case "NOTE/GET_ONE/SUCCESS":
      return { ...state, loading: false, note: payload }
    default:
      return state
  }
}
