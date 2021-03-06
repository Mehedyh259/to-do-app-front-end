import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';


const RequireAuth = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();
    if (loading) {
        return <Loading />
    }

    if (!user) {
        toast.error("Login needed for that destination page !!");
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
};

export default RequireAuth;