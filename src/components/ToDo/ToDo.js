import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';
import './ToDo.css'

const ToDo = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user, loading, error] = useAuthState(auth);

    const getData = async () => {
        const email = user?.email;
        const url = `http://localhost:5000/task?email=${email}`;
        const { data } = await axios.get(url);
        setTasks(data);
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            getData();
        }

    }, [user]);

    const handleAddTask = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const task = { email: user?.email, title, description, completed: false };
        const url = `http://localhost:5000/task`;

        const { data } = await axios.post(url, task);
        if (data.insertedId) {
            toast.success('Task added successfully !!');
            getData();
            event.target.reset();
        }
    }

    const handleDoneTask = async (id) => {
        const url = `http://localhost:5000/task/${id}`;
        const { data } = await axios.put(url);
        if (data.modifiedCount) {
            toast.success('Task Completed');
            getData();
        }
    }

    const handleDeleteTask = async (id) => {
        const url = `http://localhost:5000/task/${id}`;
        console.log(url)
        const { data } = await axios.delete(url);
        if (data.deletedCount) {
            toast.success("Task deleted successfully !!")
            getData();
        }
    }

    if (loading || isLoading) {
        return <Loading />
    }
    return (
        <div className='my-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div style={{ width: '100%' }} className=" mx-auto p-5 mb-5 shadow-lg rounded">

                <form onSubmit={handleAddTask} >
                    <h2 className="text-3xl font-bold text-accent mb-5 text-center">Add Your Task Here</h2>

                    <input type="text" name='title' placeholder="Task Title" className="input input-bordered w-full mb-5" required />

                    <textarea className="textarea textarea-info w-full mb-5" rows={5} name='description' placeholder="Task Description" required></textarea>

                    <input type="submit" value="Add Task" className='w-full mx-auto btn btn-primary text-white' />
                </form>
            </div>


            <div className="tasks">
                <h2 className="text-3xl text-center">Your Tasks </h2>
                {
                    tasks?.map((task) => <div key={task._id} className="rounded-xl my-3 p-5  shadow-lg flex justify-between items-center">

                        <div>
                            <h2 className={`text-xl uppercase font-bold mb-1 ${task.completed ? "strikethrough text-accent" : 'text-primary'}`}>{task.title}</h2>
                            <p className={task.completed ? "strikethrough" : ''}>{task.description}</p>
                        </div>
                        <div>
                            <button onClick={() => handleDoneTask(task._id)} disabled={task.completed} className='btn btn-xs btn-primary mr-2 text-white'>
                                {
                                    task.completed ? "completed" : 'complete'
                                }
                            </button>
                            <button onClick={() => handleDeleteTask(task._id)} className='btn btn-xs btn-error mr-2 text-white'>delete</button>
                        </div>
                    </div>)
                }


            </div>



        </div>
    );
};

export default ToDo;