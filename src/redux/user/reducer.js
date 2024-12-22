const DEFAULT_SATE = {
  loading: false,
  user: null,
  users: [],
  error: null,
}

export const userReducer = (state = DEFAULT_SATE, { type, payload }) => {
  switch (type) {
    case "USER/FETCH/START":
      return { ...state, loading: true, error: null }
    case "USER/FETCH/SUCCESS":
      return { ...state, loading: false, user: payload }
    case "USER/FETCH/ERROR":
      return { ...state, loading: false, error: payload }
    case "USER/LOGOUT":
      return { ...state, user: null, error: null }
    default:
      return state
  }
}
