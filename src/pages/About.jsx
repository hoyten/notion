import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUser } from '../redux/user/selectors'


export default function Main() {
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.removeItem('userProfile') 
    const savedData = JSON.parse(localStorage.getItem('userProfile'))
    if (savedData) {
      setPhoto(savedData.photo || null)
      setName(savedData.name || '')
      setPhone(savedData.phone || '')
      setAddress(savedData.address || '')
    }
  }, [user.id])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const userInfo = { photo, name, phone, address }
    localStorage.setItem('userProfile', JSON.stringify(userInfo))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex justify-between flex-col flex-1 my-10 items-center">
      <h2 className="text-5xl mb-6">About Me</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-4">
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <p className="flex items-center justify-center text-gray-500 h-full">
              Upload Photo
            </p>
          )}
        </div>
        <label className="cursor-pointer bg-gray-200 py-2 px-4 text-xl">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          Upload Photo
        </label>
      </div>

      <div className="text-3xl flex flex-col gap-4 mb-6 w-full max-w-md">
        <p className="text-xl">
          Email: <span className="text-gray-500">{user.email}</span>
        </p>
        <p className="text-xl">
          Date Sign Up: <span className="text-gray-500">
            {user.createdAt.slice(0, 10)} {user.createdAt.slice(11, 19)}
          </span>
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-200 py-3 px-4 text-xl"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-200 py-3 px-4 text-xl"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-200 py-3 px-4 text-xl"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSave}
          className="bg-[#800000] py-3 px-16 text-2xl text-white rounded-md cursor-pointer hover:bg-[#660000] transition-all duration-300"
        >
          Save
        </button>
        <button
          onClick={() => navigate(`/users/${user.id}/notes`)}
          className="bg-gray-200 py-4 px-16 text-2xl cursor-pointer"
        >
          Go to Notes
        </button>
      </div>

      {saved && (
        <p className="mt-3 text-green-500 text-center transition-opacity duration-300 opacity-100">
          Saved Successfully!
        </p>
      )}
    </div>
  )
}
