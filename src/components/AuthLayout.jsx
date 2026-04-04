import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import AuthService from '../Services/authservice'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const user = useSelector(state => state.auth.user);
   

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

           
        
        
        
        let authStatus = user ? true : false;
        console.log("Protected route authStatus:", authStatus, "Expected authentication:", authentication);

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [user, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}