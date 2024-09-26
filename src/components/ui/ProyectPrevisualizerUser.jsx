import { useEffect, useState } from 'react';
import SelectTaskByUser from '../ui/SelectTaskByUser'
import { userService } from '../../services/userService';

export default function ProyectPrevisualizerUser({ close, project, handleview }) {
    const [selectedTask, setSelectedTask] = useState([])

    const handleTaskSelection = (e, id) => {
        console.log(id);
        setSelectedTask((prev) => [...prev, {
            tareaId: id,
            usuarioId: localStorage.getItem('id')
        }])
    }

    const handleSaveTaskSeletion = async () => {
        console.log(selectedTask);
        const response = await userService.assignTaskToUser(selectedTask)
        console.log(response);
        if (response.status == 200) {
            handleview()
        }
    }


    return (
        <div className="absolute h-screen w-screen backdrop-blur-sm lg:grid lg:grid-cols-4 lg:grid-rows-6">
            <div className="w-full lg:h-full h-auto bg-white lg:shadow-2xl rounded-t-2xl p-5 lg:p-10 lg:row-start-2 lg:row-end-7 lg:col-start-2 lg:col-end-4 flex flex-col">
                <div className="p-5 flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-2xl text-black font-semibold">
                                Add task to your list
                            </p>
                            <p className="text-xl text-gray-400 font-semibold">Project: {project.nombre}</p>
                        </div>
                        <p onClick={close} className='bg-gray-300 h-fit w-fit px-2 text-2xl rounded-full text-gray-50 '>X</p>
                    </div>
                    <div className="border-2 border-gray-100 rounded-3xl flex flex-col gap-5 p-5">
                        <input
                            type="text"
                            placeholder="Search Task"
                            className=" w-full px-5 py-2 border-2  border-gray-100 rounded-3xl focus:outline-none"
                        />
                        <div className="flex flex-col gap-3	">
                            {
                                project.tareas.map(tarea => (
                                    <SelectTaskByUser
                                        key={tarea.id}
                                        task={tarea}
                                        handleClick={handleTaskSelection}
                                    />
                                ))
                            }
                        </div>
                        <p onClick={handleSaveTaskSeletion} className='w-full text-center text-xl text-gray-600  px-2 py-1 hover:text-green-500 cursor-pointer '> Save Tasks </p>
                    </div>
                </div>
            </div>
        </div>



    )
}
