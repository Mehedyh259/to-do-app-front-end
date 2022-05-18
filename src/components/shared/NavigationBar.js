import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const NavigationBar = () => {

    const [user, loading, error] = useAuthState(auth);


    if (loading) {
        return <Loading />
    }

    const menuItems = <>
        <li><Link className='font-bold mx-4 btn-ghost' to='/todo'>To-Do List</Link></li>
        {
            user ?
                <li><button onClick={() => signOut(auth)} class="btn btn-ghost font-bold mx-4 text-black">Log out</button></li>
                :
                <li><Link className='font-bold btn-ghost mx-4' to='/login'>Login</Link></li>
        }

    </>;



    return (
        <div style={{ zIndex: '999' }} className="navbar bg-white shadow sticky top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/todo' className="btn btn-ghost normal-case text-xl">To-Do App</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}

                </ul>
            </div>
        </div>
    );
};

export default NavigationBar;