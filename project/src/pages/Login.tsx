import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3005/api/auth/login', {
                email,
                password
            });
            
            if (response.data.success) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                navigate('/mode-selection'); // Navigate to mode selection instead of home
            } else {
                setErrorMessage(response.data.message || 'Invalid email or password.');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setErrorMessage(err.response.data.message || 'Login failed. Please check your credentials.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-light'> 
            <div className='p-4 bg-white shadow rounded' style={{ width: '350px' }}> 
                <h2 className='text-center text-primary mb-4'>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 
                    <div className='mb-3'> 
                        <label htmlFor='email' className='form-label'>Email</label> 
                        <input 
                            type='email' 
                            id='email' 
                            placeholder='Enter Email' 
                            className='form-control' 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        /> 
                    </div> 
                    <div className='mb-3'> 
                        <label htmlFor='password' className='form-label'>Password</label> 
                        <input 
                            type='password' 
                            id='password' 
                            placeholder='Enter Password' 
                            className='form-control' 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        /> 
                    </div> 
                    <button 
                        type='submit' 
                        className='btn btn-primary w-100'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button> 
                </form> 
                <p className='text-center mt-3'>
                    <Link to="/forgot-password" className='text-decoration-none text-primary'>
                        Forgot password?
                    </Link>
                </p>
                <p className='text-center'>
                    Don't have an account? {' '}
                    <Link to="/signup" className='text-decoration-none text-primary'>
                        Sign up
                    </Link>
                </p>
            </div> 
        </div>
    );
};

export default Login;
