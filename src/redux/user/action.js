import { BASE_URL } from "../../constants"

export const registerUser = (email, password) => async (dispatch) => {
  dispatch({ type: "USER/FETCH/START" })

  try {
    const user = { email, password }
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to register user')
    }

    const newUser = await response.json()
    dispatch({ type: "USER/FETCH/SUCCESS", payload: newUser })
    localStorage.setItem("userId", newUser.id)
  } catch (error) {
    dispatch({ type: "USER/FETCH/ERROR", payload: "Registration failed. Please try again." })
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "USER/FETCH/START" })

  try {
    const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`)
    
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    const users = await response.json()

    if (users.length === 1) {
      dispatch({ type: "USER/FETCH/SUCCESS", payload: users[0] })
      localStorage.setItem("userId", users[0].id)
    } else {
      dispatch({ type: "USER/FETCH/ERROR", payload: "Invalid email or password. Please try again." })
    }
  } catch (error) {
    dispatch({ type: "USER/FETCH/ERROR", payload: "Something went wrong. Please try again later." })
  }
}

export const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: "USER/FETCH/START" })

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    const user = await response.json()
    dispatch({ type: "USER/FETCH/SUCCESS", payload: user })
  } catch (error) {
    dispatch({ type: "USER/FETCH/ERROR", payload: "Unable to fetch user data. Please try again." })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("userId")
    dispatch({ type: "USER/LOGOUT" })
  }
}
