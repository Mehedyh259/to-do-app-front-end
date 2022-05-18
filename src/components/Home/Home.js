import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
            <Link to='/todo' className='btn btn-lg btn-primary text-white'>Get Started To-Do App</Link>
        </div>
    );
};

export default Home;