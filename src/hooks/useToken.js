import axios from 'axios';
import { useState, useEffect } from 'react';
const useToken = (user) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const email = user?.user?.email;

        if (email) {
            const url = `https://todo-server-1542.herokuapp.com/login`;
            const getToken = async () => {
                const { data } = await axios.post(url, { email })
                localStorage.setItem('accessToken', data.accessToken);
                setToken(data.accessToken);
            }
            getToken();
        }

    }, [user])

    return [token];
};

export default useToken;