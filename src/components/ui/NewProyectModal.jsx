import ProyectDisplay from "./ProyectDisplay";
import UserAvailableModal from "./UserAvailableModal";
import AssignedTask from "./AssignedTask";
import useFetchStaff from "../../hooks/useFetchStaff";
import { default as axios } from "../../api/axiosInstace";
import { useState } from "react";

function NewProyectModal({ handleClickModal, handleSubmit }) {
    const { staff, loading, error, refetch } = useFetchStaff();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState("");
    const [newProyect, setNewProyect] = useState({
        id: null,
        nombre: "",
        descripcion: "",
        foto: "",
        usuarios: users,
        tareas: tasks,
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewProyect((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputTask = (e) => {
        setTask(e.target.value);
    };

    const deleteTask = (e) => {
        const { id } = e.target
        setTasks((prevData) => {
            const updatedTasks = prevData.filter(task => task.name !== id);
            setNewProyect((prevData) => ({
                ...prevData,
                tareas: updatedTasks,
            }));
            setTask("");
            return updatedTasks;
        });

    }
    const saveTask = () => {
        setTasks((prevData) => {
            const updatedTasks = [...prevData, { name: task }];
            setNewProyect((prevData) => ({
                ...prevData,
                tareas: updatedTasks,
            }));
            setTask("");
            return updatedTasks;
        });
    };

    const toggleAddUser = (id, state) => {
        if (state) {
            console.log('se añadio');
            setUsers((prevData) => {
                const updatedUsers = [...prevData, { id: id }];
                setNewProyect((prevData) => ({ ...prevData, usuarios: updatedUsers }));
                return updatedUsers; 
            });
        } else {
            console.log('se elimino');
            setUsers((prevData) => {
                const updatedUsers = prevData.filter(user => user.id !== id); 
                setNewProyect((prevData) => ({ ...prevData, usuarios: updatedUsers }));
                return updatedUsers;
            });
        }
    };
    
    const handleCreataProyect = () => {
        console.log(newProyect);

    };

    return (
        <div className="absolute w-screen h-screen backdrop-blur-sm grid grid-cols-4 grid-rows-6">
            <div className="w-full h-full bg-white shadow-2xl rounded-t-2xl p-10 row-start-2 row-end-7 col-start-2 col-end-4 flex flex-col">
                <div className="flex justify-end">
                    <i
                        className="text-5xl text-gray-400 hover:scale-105 cursor-pointer duration-150 bx bxs-x-square"
                        onClick={handleClickModal}
                    ></i>
                </div>
                <div className="w-full">
                    <input
                        name="nombre"
                        type="text"
                        className="bg-transparent text-4xl focus:outline-none"
                        placeholder="New Proyect"
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-3 grid-rows-1 w-full h-full mt-5 gap-5 overflow-y-auto">
                    <div className="col-start-1 col-end-3 grid grid-cols-2 grid-rows-[175px_auto] row-start-1 row-end-2 gap-5">
                        <div className="flex gap-5 col-start-1 col-end-3">
                            <ProyectDisplay label="Select Photo" icon="bx bx-upload" />
                            <div>
                                <textarea
                                    name="descripcion"
                                    value={newProyect.descripcion}
                                    onChange={handleChange}
                                    className="border-2 w-full h-full p-3 border-gray-100 rounded-xl text-left resize-none focus:outline-none"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        </div>
                        <div className="bg-white w-full h-full col-start-1 col-end-3 row-start-2 row-end-3 rounded-xl overflow-y-auto flex flex-col gap-5">
                            <div className="flex gap-5">
                                <input
                                    type="text"
                                    name="task"
                                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-2 focus:outline-none"
                                    placeholder="Add task"
                                    value={task}
                                    onChange={handleInputTask}
                                />
                                <button onClick={saveTask}>Save</button>
                            </div>
                            <div className="bg-white border-2 border-gray-200 w-full h-full rounded-2xl overflow-y-auto flex flex-col gap-5 p-5">
                                {tasks.map((task, index) => (
                                    <AssignedTask taskName={task.name} key={index} deleteTask={deleteTask} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-start-3 col-end-4 bg-white border-2 border-gray-100 rounded-xl grid grid-rows-[15%_70%_15%]">
                        <p className="w-full text-center p-5 text-xl text-orange-600">
                            Staff Available
                        </p>
                        <div className="overflow-y-auto flex flex-col gap-5 p-5">
                            {staff.map((user) => (
                                <UserAvailableModal
                                    name={user.nombre + " " + user.apellido}
                                    key={user.id}
                                    handleClick={toggleAddUser}
                                    id={user.id}
                                    
                                />
                            ))}
                        </div>
                        <div className="flex justify-end p-5">
                            <button
                                className="border-2 border-gray-200 py-1 px-2 hover:bg-gray-200 hover:text-black text-gray-400 rounded-xl"
                                onClick={handleCreataProyect}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProyectModal;
