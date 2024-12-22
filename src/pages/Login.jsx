import { useState, useCallback, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/user/action'
import { selectUser, selectUserLoading, selectErrorUser } from '../redux/user/selectors'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), [])

  const [password, setPassword] = useState('')
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), [])

  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = useSelector(selectUser)
  const userLoading = useSelector(selectUserLoading)
  const userError = useSelector(selectErrorUser)

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }

    setError('')
    setLoading(true)

    try {
      await dispatch(loginUser(email, password))
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [email, password, dispatch])

  useEffect(() => {
    if (user?.email) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Log in</h1>

        {error && (
          <div className="bg-red-200 text-red-700 p-3 mb-4 rounded-md text-center">
            {error}
          </div>
        )}

        {userError && (
          <div className="bg-red-200 text-red-700 p-3 mb-4 rounded-md text-center">
            {userError}
          </div>
        )}

        <div className="space-y-4">
          <input
            className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleSetEmail}
            aria-label="Email"
          />
          <div className="relative">
            <input
              className="w-full bg-gray-100 py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handleSetPassword}
              aria-label="Password"
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading || userLoading}
          className="w-full mt-6 py-3 px-6 bg-[#800000] text-white text-lg rounded-lg hover:bg-[#660000] focus:ring-2 focus:ring-[#800000] transition-all duration-300"
        >
          {loading || userLoading ? 'Loading...' : 'Log in'}
        </button>

        <div className="text-center text-lg mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#800000]-600 hover:underline font-semibold"
          >
            Register
          </Link>{' '}
          now!
        </div>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-600">
        <p>
          Created by{' '}
          <a
            href="#"
            className="text-[#800000]-600 hover:underline"
          >
            Nastya Boboed
          </a>{' '}
          &copy; 2024
        </p>
      </footer>
    </div>
  )
}
