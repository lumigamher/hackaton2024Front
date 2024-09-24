import ProyectDisplay from "./ProyectDisplay";
import UserAvailableModal from "./UserAvailableModal";
import AssignedTask from "./AssignedTask";
import useFetchStaff from "../../hooks/useFetchStaff";
import { default as axios } from "../../api/axiosInstace";
import { useState } from "react";
import { proyectService } from "../../services/proyectService";

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

    const handleCreataProyect = async () => {
        console.log(newProyect);
        const response = await proyectService.createProyect(newProyect)
        if (response.status == 200) {
            console.log("guardado");
        }

    };

    return (
        <div className="absolute w-screen h-screen backdrop-blur-sm lg:grid lg:grid-cols-4 lg:grid-rows-6">
            <div className="w-full md:h-full :h-auto bg-white lg:shadow-2xl rounded-t-2xl p-5 lg:p-10 lg:row-start-2 lg:row-end-7 lg:col-start-2 lg:col-end-4 flex flex-col">

                {/* Ajuste de tamaño de ícono para mobile */}
                <div className="flex justify-end">
                    <i
                        className="text-3xl lg:text-5xl text-gray-400 hover:scale-105 cursor-pointer duration-150 bx bxs-x-square"
                        onClick={handleClickModal}
                    ></i>
                </div>

                {/* Ajuste del input para mobile */}
                <div className="w-full">
                    <input
                        name="nombre"
                        type="text"
                        className="bg-transparent text-2xl lg:text-4xl focus:outline-none"
                        placeholder="New Proyect"
                        onChange={handleChange}
                    />
                </div>

                {/* Cambiar layout de la grid a columnas en mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 w-full h-full mt-5 gap-5 overflow-y-auto">

                    {/* Hacer que este bloque sea vertical en mobile */}
                    <div className="col-start-1 col-end-4 lg:col-start-1 lg:col-end-3 grid grid-cols-1 lg:grid-cols-2 grid-rows-[175px_auto] lg:gap-5">

                        {/* Flex direction para mobile */}
                        <div className="flex flex-col lg:flex-row gap-5 col-start-1 col-end-4">
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

                        {/* Sección de tareas ajustada para mobile */}
                        <div className="bg-white w-full h-full col-start-1 col-end-4 row-start-2 row-end-3 rounded-xl overflow-y-auto flex flex-col gap-5">
                            <div className="flex gap-5 flex-col lg:flex-row">
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

                    {/* Ajustar esta sección para ser vertical en mobile */}
                    <div className="col-start-1 col-end-4 lg:col-start-3 lg:col-end-4 bg-white border-2 border-gray-100 rounded-xl grid grid-rows-[auto_auto_auto]">
                        <p className="w-full text-center  p-5 text-lg lg:text-xl text-orange-600">
                            Staff Available
                        </p>
                        <div className="overflow-y-auto  flex flex-col gap-5 p-5">
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
