import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/user/selectors'
import { logoutUser } from '../redux/user/action'

const setActive = ({ isActive }) =>
  isActive ? 'text-black font-bold' : 'text-gray-500'

export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(selectUser)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  if (!user?.email) {
    navigate('/login')
    return null
  }

  return (
    <div className="m-auto max-w-6xl px-10 min-h-screen flex flex-col py-8">
      <header className="flex justify-between text-xl">
        <p>Welcome, {user.email}</p>
        <nav className="flex gap-10">
          <NavLink to="/" end className={setActive}>
            About
          </NavLink>
          <NavLink
            to={`/users/${user.id}/notes`}
            end
            className={setActive}
          >
            Notes
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-black transition duration-300"
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="pb-8 flex-1 flex">
        <Outlet />
      </main>
      <footer className="border-t border-black">
        <div className="flex justify-between mt-4">
          <p>
            Created by{' '}
            <a className="text-[#800000] hover:underline">
              Nastya Boboed
            </a>
          </p>
          <p>2024</p>
        </div>
      </footer>
    </div>
  )
}
