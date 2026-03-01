import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/authservice';

const Header = () => {
  const navigate = useNavigate();
    const [logged,setlogged]=useState(false)
    useEffect(() => {
     AuthService.currentUser().then(res=>res.json()).then((data)=>{
      if(data.user._id){
        // console.log(data.user)
        setlogged(true);
  
      }
    }
     ).catch((err)=>{
      console.log("Error fetching current user:", err);
      setlogged(false);
     })
    }, [])
 
  
  const handleLogout = () => {
    AuthService.logout().then(res => res.json()).then(data => {
      console.log(data.message);
      setlogged(false);
      navigate('/login'); // Redirect to login page after logout
    }).catch(error => {
      console.error("Error during logout:", error);
    })

  };

  return (
    <div className='w-full bg-blue-600 h-16  flex header relative ' >
        <div className='text-2xl font-bold text-white ml-10'>
          Smart Ai Mining
        </div>
        {logged?(<button className='p-2  text-lg bg-slate-50  rounded-lg btn absolute right-10' onClick={handleLogout}>
            Logout
        </button>):(<div className='absolute right-10 flex gap-x-20 w-48'>
        <button className='p-2  text-lg bg-slate-50  rounded-lg btn ' onClick={() => {navigate('/login')}}>
            Login
        </button>
        <button className='p-2  text-lg bg-slate-50  rounded-lg btn absolute right-10' onClick={() => {navigate('/signup')}}>
            Sign up
        </button>
        </div>)
        }

    </div>
  )
}

export default Header