import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Settings, Upload } from "lucide-react"
import profile from '../Services/profile'

import { login } from '../Slices/authSlice'
import AuthService from '../Services/authservice'


const Profile = () => {

  const [editable, setEditable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const defaultAvatar = "../../public/image.png";
  const [preview, setPreview] = useState(defaultAvatar);
  const [role, setRole] = useState("");
   const user = useSelector((state) => state.auth.user);
   const [file, setFile] = useState(null)
   const dispatch=useDispatch();

  useEffect(() => {
    // fall back to fetching if redux store is empty (e.g. page reload)
    setLoading(true)
    if(!user){
      profile.getProfile().then(({ data }) => {
      // console.log("Profile:", data.user)
      setName(data.user.firstName + " " + data.user.lastName);
      setRole(data.user.role);
      setPreview(data.user.profilePicture);
      setLoading(false);
    })
    }
    else{
      console.log("Profile from redux store:", user)
      setName(user.firstName + " " + user.lastName);
      setRole(user.role);
    setPreview(user.profilePicture);
    setLoading(false);
    }


  }, []);
  
  
  // placeholder avatar if user has none



  const handleSubmit=()=>{
    setLoading(true);
    console.log("submit profile changes");
    const formData= new FormData();
    const firstName=name.split(" ")[0];
    const lastName=name.split(" ")[1];
    console.log("firstName:",firstName,"lastName:",lastName,"file:",file);
    if(name.trim()==="" || role.trim()===""){

      alert("Nothin must be empty")
      setLoading(false);
      return;
    }
formData.append("firstName",firstName);
formData.append("lastName",lastName);
if(file){
  formData.append("image",file);
}
profile.updateProfile(formData).then((user)=>{
  console.log("updated user:",user);

 dispatch(login({ user: user, token: "abjbjsd", role: user.role||"user",isAuth:true }));


}).finally(()=>{
  
  setLoading(false);

})

  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex justify-center items-start">
      <div className="bg-slate-800 rounded-lg p-8 w-full relative max-w-md">
        <Settings className="w-6  absolute h-6 mb-4 mx-auto" onClick={() => setEditable((p) => !p)} />
        <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="w-15 h-15 rounded-full justify-center items-center flex mb-4 relative ">

            <img
              src={preview}
              alt="avatar"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <Upload className={`w-6 h-6 absolute right-0 bottom-0 ${editable ? 'block' : 'hidden'}`} onClick={() => {
              document.getElementById("fileInput").click();
            }} />
            <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files[0]; 
              
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }} />


          </div>
          <div className={`flex items-center gap-2 mb-4  px-2 py-1   ${editable ? 'justify-start w-full' : 'w-fit'}`}>
            <label htmlFor="name" className="font-semibold">Name:</label>

            <input
              type="text"
              id="name"
              className={`text-lg bg-transparent rounded-lg font-bold p-1 outline-none ${editable ? 'bg-gray-300 text-gray-500 w-full' : ''
                }`}
              style={!editable ? { width: `${name.length + 2}ch` } : {}}
              value={name}
              disabled={!editable}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`flex items-center gap-2 mb-4  px-2 font-sm   ${editable ? 'justify-start w-full' : 'w-fit'}`}>
            <label htmlFor="name" className="w-13 font-bold">Role:</label>

            <input
              type="text"
              id="name"

               className={`text-lg bg-transparent rounded-lg font-bold p-2 outline-none ${editable ? 'bg-gray-300 text-gray-500 w-full' : ''
                }`}
              style={!editable ? { width: `${name.length + 2}ch` } : {}}
              value={role}
              disabled={!editable}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {editable && (
            <div className="flex w-full justify-center gap-4">
              <button className="btn w-[80%] bg-green-500 disabled:bg-green-700  px-3 text-white rounded-md" onClick={() => {;
                  handleSubmit();
      
              }} disabled={Loading}>Save</button>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}

export default Profile



