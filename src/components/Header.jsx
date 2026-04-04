import React, { use } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/authservice';
import { useDispatch } from 'react-redux';
import { login, logout } from '../Slices/authSlice';
import { useSelector } from 'react-redux';


const Header = () => {
  const navigate = useNavigate();
  const [logged, setlogged] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  //  const token=useSelector(state=>state.auth.token);console.log(token);
   useEffect(() => {
    AuthService.currentUser()
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          console.log("current user data in header component:", data.user);
           dispatch(login({ user: data.user, token: "abjbjsd", role: data.role||"user" }));
                   console.log("login dispacth");
                 
        } else {
          dispatch(logout());
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      });

    return () => {
      // Cleanup function if needed
    }
  }, [])
  

 
  useEffect(() => {

    console.log("useEffect in header, user:", user);
    if (user) {
      setlogged(true)


    } else {
      // navigate('/');
      setlogged(false)
    }

  }, [dispatch,navigate,user])


  const handleLogout = () => {
    AuthService.logout().then(res => res.json()).then(data => {
      console.log(data.message);
      dispatch(logout());

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
      {/* // Show login/signup buttons only if not logged in */}
      {logged ? (
        <div className='absolute right-10 flex gap-x-5'>

          <button className='p-2  text-lg bg-slate-50  rounded-lg btn ' onClick={() => navigate('/home')}>
            Home
          </button>
          <button className='p-2  text-lg bg-slate-50  rounded-lg btn ' onClick={() => navigate('/profile')}>
            Profile
          </button>
          <button className='p-2  text-lg bg-slate-50  rounded-lg btn ' onClick={handleLogout}>
            Logout
          </button>

        </div>
      ) : (<div className='absolute right-10 flex gap-x-20 w-48'>
        <button className='p-2  text-lg bg-slate-50  rounded-lg btn ' onClick={() => { navigate('/login') }}>
          Login
        </button>
        <button className='p-2  text-lg bg-slate-50  rounded-lg btn absolute right-10' onClick={() => { navigate('/signup') }}>
          Sign up
        </button>
      </div>)
      }

    </div>
  )
}

export default Header