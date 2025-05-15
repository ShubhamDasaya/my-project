import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaCheck, FaPenAlt, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateTask, DeleteTeskById, GetAllTesk, UpdateTaskById } from './Api';
import { notify } from './utils';


const TaskManager = () => {
    const [input, setInput] = useState('');
    const [tasks, setTask] = useState([]);
    const [copyTasks, setCopyTask] = useState([]);
    const [updateTask, setUpdateTask] = useState(null)

    const handleTask = () => {
        if (updateTask && input) {

            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleupdateItem(obj)
        } else if (updateTask === null && input) {
            handleAddTask()
        }
        setInput('');
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName)
        }
    }, [updateTask])




    const handleAddTask = async () => {
        if (!input.trim()) {
            notify('Task cannot be empty', 'error');
            return;
        }

        const obj = {
            taskName: input,
            isDone: false
        };

        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                notify(message, 'success');

            } else {
                notify(message, 'error');
            }
            featchAllTask();
        } catch (error) {
            notify('Failed to create task', 'error');
            console.error(error);
        }
    };

    const featchAllTask = async () => {
        try {
            const { data } = await GetAllTesk();
            console.log(data);

            setTask(data)
            setCopyTask(data);
        } catch (error) {
            console.log(error);
            notify('Failed to Fatch task', 'error')

        }
    }
    useEffect(() => {
        featchAllTask();
    }, [])

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTeskById(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }

            featchAllTask();


        } catch (error) {
            console.log(error);
            notify('Failed to Delete task', 'error')

        }
    }


    const handleCheckAndUncheck = async (item) => {
        try {
            const { _id, isDone, taskName } = item;
            const obj = {
                taskName,
                isDone: !isDone
            };

            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            featchAllTask();

        } catch (error) {
            console.log(error);
            notify('Failed to Update task', 'error');
        }
    };

    const handleupdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = { taskName, isDone: isDone }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                notify(message, success)
            } else {
                notify(message, 'error')
            }
            featchAllTask();
        } catch (error) {
            notify('Failed to Update task', 'error');
            return error;
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.trim().toLowerCase();
        setTask(copyTasks.filter(item => item.taskName.toLowerCase().includes(term)));
    };






    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='mb-5'>Task Manager App</h1>

            {/* Task Input & Search */}
            <div className='d-flex justify-content-between align-items-center mb-4 w-100 gap-5'>
                <div className='input-group flex-grow-1 me-4'>
                    <input
                        type="text"
                        className='form-control me-1'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Add new Task'
                    />
                    <button className='btn btn-success btn-sm me-2' onClick={handleTask}>
                        <FaPlus className="m-2" />
                    </button>
                </div>

                <div className='input-group flex-grow-1'>
                    <input type="text" className='form-control' placeholder='Search Tasks' onChange={handleSearch} />
                    <span className='input-group-text' ><FaSearch /></span>
                </div>
            </div>

            {/* Task List */}
            <div className='d-flex flex-column w-100'>
                {tasks.map((item) => {
                    return (
                        <div key={item._id} className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'>

                            <span style={{ textDecoration: item.isDone ? "line-through" : "none" }}>
                                {item.taskName}
                            </span>

                            <div  className="d-flex gap-2">

                            <div>
                                <button className='btn btn-success btn-sm ' type='button' onClick={() => handleCheckAndUncheck(item)}><FaCheck /></button>
                            </div>
                            <div>
                                <button className='btn btn-primary btn-sm ' type='button' onClick={() => setUpdateTask(item)}><FaPenAlt /></button>
                            </div>
                            <div>
                                <button className='btn btn-danger btn-sm ' type='button' onClick={() => handleDeleteTask(item._id)}><FaTrash /></button>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Toast Notifications */}
            <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default TaskManager;
