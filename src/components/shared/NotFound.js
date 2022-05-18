import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
            <div className='text-center'>
                <h1 className="text-4xl text-accent font-bold">404 | Page Not Found </h1>
                <Link to='/todo' className='btn btn-primary mt-5 text-white'>Go Back Home</Link>
            </div>
        </div>
    );
};

export default NotFound;