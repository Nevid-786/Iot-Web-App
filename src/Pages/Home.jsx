import React, { use } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AuthService from '../Services/authservice';
import SensorService from '../Services/sensorService';
  import { useRef } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {io} from "socket.io-client";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';




const Home = () => {
  const [logged, setlogged] = useState(false)
  const [pole, setPole] = useState("pole-A")
  const [sensors, setSensors] = useState([]);

 const user =useSelector((state) => state.auth.user);
  const [devices, setDevices] = useState([])
  const axiosprivate=useAxiosPrivate();

 const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_URL, {
        withCredentials: true,
      }),
    []
  );
  useEffect(() => {
    console.log("pole changed",pole)
    socket.emit("pole",pole)
  }, [pole])

useEffect(() => {
  if (user) {
    console.log("User found in Home component:", user.user._id);
    setlogged(true);
  }
  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });
  console.log("User in socket useEffect:", user);
  if (user.user._id) {
    socket.emit("register", user.user._id); // Register userId with the server
  }
  socket.on("sensorData", (data) => {
    console.log("Received real-time sensor data:", data);
    setSensors(data);
  console.log("Current pole:", pole);
    

  });


  return () => {
    socket.off("connect");
  };
} , [user]);

  return (
    <div className='home min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-white mb-2'>IoT Dashboard</h1>
        <p className='text-slate-300'>Welcome back, {logged ? user.user?.firstName || 'User' : 'Guest'}</p>
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
          <p className='text-sm font-mono overflow-hidden text-ellipsis'>{logged ? user.user?._id : 'Not logged'}</p>
        </div>
      </div>

      {/* Devices Section */}
      <div className='mb-8 w-full bg-slate-500'>
        <h2 className='text-2xl font-bold text-white mb-4 p-2'>Your Devices</h2>
        <div className='w-full bg-indigo-600 flex justify-center gap-x-2'>
          <div className={`p-2 rounded-2xl mt-2 mb-2  ${pole === "pole-A" ? "bg-slate-500 pole-btn mb-0" : "bg-blue-600"}`} onClick={() => setPole("pole-A")}>
            Pole-A
          </div>
          <div className={`p-2 rounded-2xl mt-2 mb-2  ${pole === "pole-B" ? "bg-slate-500 pole-btn mb-0" : "bg-blue-600"}`} onClick={() => setPole("pole-B")}>
            Pole-B
          </div>
          <div className={`p-2 rounded-2xl mt-2 mb-2  ${pole === "pole-C" ? "bg-slate-500 pole-btn mb-0" : "bg-blue-600"}`} onClick={() => setPole("pole-C")}>
            Pole-C
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {sensors && sensors!={} > 0 ? (Object.entries(sensors).map(([key,value]) => (
            <div key={key} className='bg-slate-700 rounded-lg p-5 hover:bg-slate-600 transition cursor-pointer'>

              <h3 className='text-white font-semibold mb-1'>{key}</h3>

              <div className='bg-slate-800 rounded p-2 text-white text-center font-bold'>
                {value}
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