import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/Layout"
import { routes } from "./routeConfig"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: routes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
