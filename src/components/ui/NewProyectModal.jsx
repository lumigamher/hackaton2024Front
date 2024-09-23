import ProyectDisplay from "./ProyectDisplay"
import UserAvailableModal from "./UserAvailableModal"
import AssignedTask from "./AssignedTask"
import useFetchStaff from "../../hooks/useFetchStaff"




import {default as axios} from '../../api/axiosInstace'

function NewProyectModal() {

    // const {staff, loading, error, refetch} = useFetchStaff()
    // console.log(staff);
    
    const onose = async () => {
        try {
            const response = await axios.get('usuarios/sin-proyectos')
            console.log(response.data);
            
        } catch (error) {
            
        }
    }

    onose()

    return (
        <div className='absolute w-screen h-screen backdrop-blur-sm grid grid-cols-4 grid-rows-6 '>
            <div className='w-full h-full  bg-white shadow-2xl rounded-t-2xl p-10 row-start-2 row-end-7 col-start-2 col-end-4 flex flex-col '>
                <div className='flex justify-end '>
                    <i className='text-5xl text-gray-400 hover:scale-105 cursor-pointer duration-150 bx bxs-x-square'></i>
                </div>
                <div className='w-full'>
                    <h2 className='text-black text-4xl font-bold'>New Proyect</h2>
                </div>
                <div className='grid grid-cols-3 grid-rows-1 w-full h-full mt-5 gap-5 overflow-y-auto'>
                    <div className='col-start-1 col-end-3 grid grid-cols-2 grid-rows-[175px_auto] row-start-1 row-end-2 gap-5'>
                        <div className='flex gap-5 col-start-1 col-end-3'>
                            <ProyectDisplay
                                proyectName="Proyect Name"
                                label="Select Photo"
                                icon="bx bx-upload"
                            />
                            <textarea
                                className="border-2 w-full  p-3 border-gray-100 rounded-xl text-left resize-none focus:outline-none"
                                placeholder="Description"
                            ></textarea>
                        </div>
                        <div className="bg-white w-full h-full col-start-1 col-end-3 row-start-2 row-end-3 p-5 rounded-xl overflow-y-auto flex flex-col gap-5">
                            <input type="text" className="w-full border-2 border-gray-200 rounded-xl unded-xl py-3 px-2 focus:outline-none" placeholder="Add task" />
                            <div className="bg-white border-2 border-gray-200 w-full h-full rounded-2xl overflow-y-auto flex flex-col gap-5 p-5">
                            <AssignedTask
                            taskName={'create login'}
                            />
                            </div>
                        </div>
                    </div>
                    <div className='col-start-3 col-end-4 bg-white border-2 border-gray-100 rounded-xl grid grid-rows-[15%_70%_15%]'>
                        <p className="w-full text-center p-5 text-xl text-orange-600"> Staff Available </p>
                        <div className="overflow-y-auto flex flex-col gap-5 p-5">
                            <UserAvailableModal
                            name={'Felipe Mendoza'}
                            />
                        </div>
                        <div className="flex justify-end p-5">
                            <button className="border-2 border-gray-200 py-1 px-2 hover:bg-gray-200 hover:text-black text-gray-400 rounded-xl">save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProyectModal
