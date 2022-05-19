import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import './ToDo.css'

const ToDo = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user, loading, error] = useAuthState(auth);


    useEffect(() => {
        if (user) {
            getData();
        }

    }, [user]);

    const errorTokenHandle = (error) => {
        setIsLoading(false);
        console.log(error);
        const status = error.response.status;
        if (status === 401 || status === 403) {
            signOut(auth);
            navigate('/login');
            toast.error(error.response?.data?.message);
            localStorage.removeItem('accessToken');
        }
    }

    const getData = async () => {
        const email = user?.email;
        const url = `https://to-do-app-1324.herokuapp.com/task?email=${email}`;
        try {
            const { data } = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setTasks(data);
            setIsLoading(false)
        } catch (error) {
            errorTokenHandle(error);
        }
    }


    const handleAddTask = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const task = { email: user?.email, title, description, completed: false };
        const url = `https://to-do-app-1324.herokuapp.com/task`;

        try {
            const { data } = await axios.post(url, task, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (data.insertedId) {
                toast.success('Task added successfully !!');
                getData();
                event.target.reset();
            }
        } catch (error) {
            errorTokenHandle(error);
        }
    }

    const handleDoneTask = async (id) => {
        const url = `http://localhost:5000/task/${id}`;

        console.log(url);

        const { data } = await axios.put(url);

        if (data.modifiedCount) {
            toast.success('Task Completed');
            getData();
        }

    }

    const handleDeleteTask = async (id) => {

        const proceed = window.confirm("Are you sure you want to delete ?");

        if (proceed) {
            try {
                const url = `https://to-do-app-1324.herokuapp.com/task/${id}`;
                console.log(url)
                const { data } = await axios.delete(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                if (data.deletedCount) {
                    toast.success("Task deleted successfully !!")
                    getData();
                }
            } catch (error) {
                errorTokenHandle(error);
            }
        }

    }

    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div className='my-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div className=" max-w-lg mx-auto p-5 mb-5 shadow-lg rounded">

                <form onSubmit={handleAddTask} >
                    <h2 className="text-3xl font-bold text-accent mb-5 text-center">Add Your Task Here</h2>

                    <input type="text" name='title' placeholder="Task Title" className="input input-bordered w-full mb-5" required />

                    <textarea className="textarea textarea-info w-full mb-5" rows={5} name='description' placeholder="Task Description" required></textarea>

                    <input type="submit" value="Add Task" className='w-full mx-auto btn btn-primary text-white' />
                </form>
            </div>


            <div className="tasks">

                {
                    tasks.length === 0 ?
                        <h2 className="text-3xl text-center">You Haven't Created Any Task Yet</h2>
                        :
                        <h2 className="text-3xl text-center">Your Tasks</h2>
                }

                {
                    tasks?.map((task) => <div key={task._id} className="rounded-xl my-2 p-5  shadow-lg flex justify-between items-center">

                        <div className='w-1/2 lg:w-8/12'>
                            <h2 className={`text-xl uppercase font-bold mb-1 ${task.completed ? "strikethrough text-accent" : 'text-primary'}`}>{task.title}</h2>
                            <p className={task.completed ? "strikethrough" : ''}>{task.description}</p>
                        </div>
                        <div>
                            <p>
                                <button onClick={() => handleDoneTask(task._id)} disabled={task.completed} className='btn btn-xs btn-primary mr-2 text-white'>
                                    {
                                        task.completed ? "completed" : 'complete'
                                    }
                                </button>
                                <button onClick={() => handleDeleteTask(task._id)} className='btn btn-xs btn-error mr-2 text-white'>delete</button>
                            </p>
                        </div>
                    </div>)
                }


            </div>



        </div>
    );
};

export default ToDo;
