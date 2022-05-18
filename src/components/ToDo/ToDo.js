import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../shared/Loading';

const ToDo = () => {
    const [user, loading, error] = useAuthState(auth);

    const handleAddTask = async (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const task = { email: user?.email, title, description, completed: false };
        const url = `http://localhost:5000/task`;

        const { data } = await axios.post(url, task);
        console.log(data);




    }

    if (user) {
        console.log(user?.email);
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div className='my-5'>
            <div className="max-w-lg mx-auto p-5 mb-5 shadow-lg rounded">

                <form onSubmit={handleAddTask} >
                    <h2 className="text-3xl font-bold text-accent mb-5 text-center">Add Your Task Here</h2>

                    <input type="text" name='title' placeholder="Task Title" className="input input-bordered w-full mb-5" required />

                    <textarea class="textarea textarea-info w-full mb-5" name='description' placeholder="Task Description" required></textarea>

                    <input type="submit" value="Add Task" className='w-full mx-auto btn btn-primary text-white' />
                </form>
            </div>

            <div class="overflow-x-auto">
                <table class="table w-full text-center">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Pending</td>
                            <td>
                                <button className='btn btn-xs btn-primary mr-2 text-white'>mark done</button>
                                <button className='btn btn-xs btn-error mr-2 text-white'>delete</button>
                            </td>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Pending</td>
                            <td>
                                <button className='btn btn-xs btn-primary mr-2 text-white'>mark done</button>
                                <button className='btn btn-xs btn-error mr-2 text-white'>delete</button>
                            </td>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Pending</td>
                            <td>
                                <button className='btn btn-xs btn-primary mr-2 text-white'>mark done</button>
                                <button className='btn btn-xs btn-error mr-2 text-white'>delete</button>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ToDo;