import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../shared/Loading';

const Login = () => {


    let errorMessage = '';
    const location = useLocation();
    let from = location.state?.from?.pathname || '/todo';

    const navigate = useNavigate();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useToken(user || gUser);


    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);



    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }

    if (error) {
        errorMessage = '';
        errorMessage = <p className='p-2 rounded bg-red-800 my-3 text-white'>{error?.message}</p>
    }
    if (gError) {
        errorMessage = '';
        errorMessage = <p className='p-2 rounded bg-red-800 my-3 text-white'>{gError?.message}</p>
    }

    if (loading || gLoading) {
        return <Loading />
    }





    return (

        <div className='my-5'>
            <div className='max-w-md mx-auto p-5 rounded shadow-xl my-5'>
                <form onSubmit={handleSubmit} >
                    <h2 className="text-3xl font-bold text-accent mb-5 text-center">Please Login Here</h2>
                    {
                        errorMessage && errorMessage
                    }

                    <input type="email" name='email' placeholder="Enter Your Email" className="input input-bordered w-full mb-5" required />

                    <input type="password" name='password' placeholder="Enter Your Password" className="input input-bordered w-full mb-5" required />

                    <input type="submit" value="Login" className='w-full mx-auto btn btn-primary text-white' />
                </form>

                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-accent mx-auto w-full mb-4'>Google Sign In</button>

                <p>Don't have an account? <Link to='/register' className="text-blue-600">register here</Link></p>

            </div>
        </div>
    );
};

export default Login;