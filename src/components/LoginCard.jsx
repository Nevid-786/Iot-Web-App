import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';    
import AuthService from '../Services/authservice';
const LoginCard = () => {
    const [submit, setSubmit] = useState(true); 
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
const navigate=useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(false);
        console.log(formData)
        if (formData.email === ""||formData.password==="") {
            alert("Please fill in all fields");
            navigate('/login'); 
            return;
        }
        const response = await AuthService.login(formData);
    const data = await response.json(); 
    if (!response.ok) {
    console.log(data.errors);
    setErrors(data.errors);
    setSubmit(true);
    return;
  }
  console.log("login successful:", data);
        navigate('/'); // Redirect to home page after login
        console.log(formData);
    };

    return (
        <div className='rounded-3xl loginCard flex justify-center items-center flex-col  bg-slate-200'>
            <h1 className='text-2xl font-bold'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col p-9 gap-y-4 '>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="btn bg-blue-500 text-white rounded-md w-full" type="submit">Login</button>
                 <div>
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))} 
                            </ul>
                            </div>)}

            </div>
            </form>
<h3>
Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={()=>{navigate("/signup")}} disabled={!submit}>Sign Up</span>
</h3>

        </div>
    )
}

export default LoginCard