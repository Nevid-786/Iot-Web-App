import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AuthService from '../Services/authservice'

const Profile = () => {
  const reduxUser = useSelector(state => state.auth.user)
  const [user, setUser] = useState(reduxUser || {})

  useEffect(() => {
    // fall back to fetching if redux store is empty (e.g. page reload)
    if (!reduxUser) {
      AuthService.currentUser()
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user)
        })
        .catch(err => console.error('Profile fetch error', err))
    }
  }, [])

  // placeholder avatar if user has none
  const defaultAvatar =
    user.profilePic || "../../public/image.png";

  const [preview, setPreview] = useState(defaultAvatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // TODO: upload to backend if needed
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex justify-center items-start">
      <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="avatar"
            className="w-32 h-32 rounded-full mb-4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <p className="text-lg">
            <span className="font-semibold">Name:</span>{' '}
            {user.firstName} {user.lastName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile