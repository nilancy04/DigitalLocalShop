import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post('http://localhost:3005/login', { email, password })
            .then(res => { 
                if (res.data === "Login Successfully") { 
                    navigate('/HomePage');
                } else {
                    setErrorMessage('Login failed. Please check your credentials.'); // Set error message
                    console.log('Login failed'); // Optionally handle error feedback here
                }
            })
            .catch(err => {
                setErrorMessage('Login failed. Please check your credentials.'); // Set error message for catch
                console.log(err);
            });
    };

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-light' style={{ height: '100vh' }}> 
            <div className='p-4 bg-white shadow rounded' style={{ width: '350px' }}> 
                <h2 className='text-center text-primary mb-4'>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 
                    <div className='mb-3'> 
                        <label htmlFor='email' className='form-label'>Email</label> 
                        <input type='email' id='email' placeholder='Enter Email' className='form-control' 
                            value={email} onChange={e => setEmail(e.target.value)} required /> 
                    </div> 
                    <div className='mb-3'> 
                        <label htmlFor='password' className='form-label'>Password</label> 
                        <input type='password' id='password' placeholder='Enter Password' className='form-control' 
                            value={password} onChange={e => setPassword(e.target.value)} required /> 
                    </div> 
                    <button type='submit' className='btn btn-primary w-100'>Login</button> 
                </form> 
                <p className='text-center mt-3'>
                    <a href='#' className='text-decoration-none text-primary'>Forgot password?</a>
                </p>
                <p className='text-center'>
                    Don't have an account? <a href='#' className='text-decoration-none text-primary'>Sign up</a>
                </p>
            </div> 
        </div>
    );
};

export default Login;
