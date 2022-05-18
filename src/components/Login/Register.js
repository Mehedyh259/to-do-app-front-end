import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';


const Register = () => {

    const navigate = useNavigate();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    if (gLoading || loading) {
        return <Loading />
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    if (user) {
        signOut(auth);
        navigate('/login');
        toast.success('Registration Successfull !!');
    }

    if (gUser) {
        navigate('/todo');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    return (
        <>
            <div className='max-w-md mx-auto p-5 rounded shadow-xl my-5'>
                <form onSubmit={handleSubmit} >
                    <h2 className="text-3xl font-bold text-accent mb-5 text-center">Please Register</h2>

                    <input type="text" name='name' placeholder="Enter Your Name" class="input input-bordered w-full mb-5" required />

                    <input type="email" name='email' placeholder="Enter Your Email" class="input input-bordered w-full mb-5" required />

                    <input type="password" minLength={6} name='password' placeholder="Enter Your Password" class="input input-bordered w-full mb-5" required />

                    <input type="submit" value="Register" className='w-full mx-auto btn btn-primary text-white' />
                </form>

                <div class="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-accent mx-auto w-full mb-4'>Google Sign In</button>

                <p>Already have an account? <Link to='/login' className="text-blue-600">Please Login</Link></p>

            </div>
        </>
    );
};

export default Register;