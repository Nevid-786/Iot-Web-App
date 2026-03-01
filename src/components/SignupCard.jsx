import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';    
import AuthService from '../Services/authservice';

const SignupCard = () => {
    const [submit, setSubmit] = useState(true);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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

    const handleSubmit = async(e) => {
        console.log("submit")
        setSubmit(false);
        e.preventDefault();
        console
        if (formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.password === "") {
            // alert("Please fill in all fields");
            navigate('/login'); 
            return;
        }

         const response = await AuthService.signup(formData);
    const data = await response.json();

    if (!response.ok) {
    console.log(data.errors);
    setErrors(data.errors);
    setSubmit(true);
    return;
  }
  console.log("Signup successful:", data);
        navigate('/login'); // Redirect to login page after signup
        console.log(formData);
    };

    return (
        <div className='rounded-3xl loginCard flex justify-center items-center flex-col  bg-slate-200'>
            <h1 className='text-2xl font-bold'>Register a New account</h1>
            <form onSubmit={handleSubmit} className='flex flex-col p-9 gap-y-4 '>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
                <button className="btn bg-blue-500 text-white rounded-md w-full" type="submit" disabled={!submit}>Register</button>
            </form>
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
<h3>
Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => {navigate('/login')}}>Login</span>
</h3>

        </div>
    )
}

export default SignupCard