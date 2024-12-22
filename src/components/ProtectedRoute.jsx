import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectUser, selectUserLoading } from "../redux/user/selectors"


export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser)
  const loading = useSelector(selectUserLoading)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
