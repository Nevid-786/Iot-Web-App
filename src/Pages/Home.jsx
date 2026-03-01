import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AuthService from '../Services/authservice';
import SensorService from '../Services/sensorService';

const Home = () => {
  const [logged, setlogged] = useState(false)

  const [user, setuser] = useState({});
  const [devices, setDevices] = useState([])








  useEffect(() => {

    // Check if user is logged in
    AuthService.currentUser().then(res => res.json()).then((data) => {
      if (data.user._id) {
        console.log(data.user._id)
        setlogged(true);
 const interval = setInterval(() => {
      SensorService.getSensors({
          poleId: "pole-A",
          userId: data.user._id
        }).then(res => res.json()).then((res) => {
          console.log("Nevid")
          console.log(res);
          setDevices(res);

        })


    
  }, 2000);






    


        setuser(data.user);
      }
    }
    ).catch((err) => {
      console.log("Error fetching current user:", err);
      setlogged(false);
    })

  return () => clearInterval(interval);


  }, [])
  

  return (
    <div className='home min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-white mb-2'>IoT Dashboard</h1>
        <p className='text-slate-300'>Welcome back, {logged ? user?.name || 'User' : 'Guest'}</p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-blue-600 rounded-lg p-6 text-white'>
          <p className='text-slate-200 text-sm mb-2'>Active Devices</p>

        </div>
        <div className='bg-purple-600 rounded-lg p-6 text-white'>
          <p className='text-slate-200 text-sm mb-2'>Avg Temperature</p>
          <p className='text-3xl font-bold'>22.5°C</p>
        </div>
        <div className='bg-orange-600 rounded-lg p-6 text-white'>
          <p className='text-slate-200 text-sm mb-2'>Humidity</p>
          <p className='text-3xl font-bold'>62%</p>
        </div>
        <div className='bg-indigo-600 rounded-lg p-6 text-white'>
          <p className='text-slate-200 text-sm mb-2'>User ID</p>
          <p className='text-sm font-mono overflow-hidden text-ellipsis'>{logged ? user?._id : 'Not logged'}</p>
        </div>
      </div>

      {/* Devices Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-white mb-4'>Your Devices</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {devices != [] ? (devices.map((device) => (
            <div key={device.key} className='bg-slate-700 rounded-lg p-5 hover:bg-slate-600 transition cursor-pointer'>

              <h3 className='text-white font-semibold mb-1'>{device.key}</h3>

              <div className='bg-slate-800 rounded p-2 text-white text-center font-bold'>
                {device.value}
              </div>
            </div>
          ))) : ""}
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-slate-700 rounded-lg p-6'>
        <h2 className='text-xl font-bold text-white mb-4'>Recent Activity</h2>
        <div className='space-y-3'>
          <div className='flex items-center text-slate-300 text-sm'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
            Temperature Sensor updated: 24.5°C
          </div>
          <div className='flex items-center text-slate-300 text-sm'>
            <span className='w-2 h-2 bg-blue-500 rounded-full mr-3'></span>
            Motion detected in Hallway
          </div>
          <div className='flex items-center text-slate-300 text-sm'>
            <span className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></span>
            Smart Light turned off
          </div>
          <div className='flex items-center text-slate-300 text-sm'>
            <span className='w-2 h-2 bg-green-500 rounded-full mr-3'></span>
            Humidity Sensor synchronized
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home