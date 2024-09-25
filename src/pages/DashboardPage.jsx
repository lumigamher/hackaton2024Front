import ProyectDisplay from '../components/ui/ProyectDisplay'
import Input from '../components/ui/Input'
import AddNewProyect from '../components/ui/AddNewProyect'
import { useEffect, useState } from 'react'
import NewProyectModal from '../components/ui/NewProyectModal'
import { useAuth } from '../hooks/useAuth'
import { proyectService } from '../services/proyectService'
import StaffDisplay from '../components/StaffDisplay'
import TaskCard from '../components/ui/TaskCard'

function DashboardPage() {

  const [showNewProyectModal, setShowNewProyectModal] = useState(false)
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const { logout } = useAuth()


  useEffect(() => {
    const fetchProjects = async () => {
      const data = await proyectService.getAllProjects()
      setProjects(await data.data)
    }
    fetchProjects()
  }, [isCreated])

  useEffect(() => {
    console.log(project);

  }, [project])

  const handleModalView = () => {
    setShowNewProyectModal(prev => !prev)
    setIsCreated(prev => !prev)
  }
  const handleCreateNewProyect = () => {
    setShowNewProyectModal(prev => !prev)
  }
  const handleShowDetails = async (e) => {
    setProject(null)
    const { id } = e.target
    setProject(await proyectService.getProyectById(id))

  }


  return (
    <div className="flex flex-col sm:flex-row h-screen sm:h-auto w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="w-full sm:w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>

      <div className="flex h-fit lg:h-full w-full flex-col gap-3 bg-slate-50 p-8">
        <div className="flex w-full justify-end">
          <p className="text-sm">
            <button
              onClick={logout}
              className="hover:text-red-600 hover:scale-125 hover:font-semibold pl-10 -translate-x-5 duration-300"
            >
              Log out
            </button>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Admin</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <h2 className="text-2xl font-semibold">Hi, Luis!</h2>
            <Input
              type="text"
              className="w-full sm:w-64 rounded-lg border-2 border-gray-100 focus:border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-orange-600">Your projects</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <AddNewProyect handleClick={handleModalView} />
            <div className="w-full overflow-x-auto flex ">
              <div className="flex min-w-max gap-5">
                {
                  projects.map((project) => {
                    const totalHours = project.usuarios.reduce((acc, user) => {
                      return acc + user.tiempoTrabajado
                    }, 0)
                    console.log(totalHours);

                    return (
                      <ProyectDisplay
                        key={project.id}
                        projectName={project.nombre}
                        label='Hours worked'
                        showDetails={handleShowDetails}
                        id={project.id}
                        time={totalHours}
                      />
                    )
                  })
                }


              </div>
            </div>
          </div>
        </div>
        {
          project ? (
            <div>
              <div className='w-full flex justify-between'>
                <p className="text-orange-600 ">{project.nombre} staff</p>
                <button className='hover:text-red-600 hover:scale-125 hover:font-semibold pl-10 -translate-x-5 duration-300'
                  onClick={() => setProject(null)}> clear </button>
              </div>
              <StaffDisplay projectIn={project} />
              <div className='w-full flex justify-between'>
                <p className="text-orange-600 ">{project.nombre} Task</p>
              </div>
              <div className='w-full h-auto flex gap-5 flex-wrap'>
              {
                project.tareas.map((tarea) => (
                  <TaskCard
                  key={tarea.id}
                  task={tarea}
                  />
                ))
              }
              </div>
            </div>
          ) : null
        }
      </div>

      <div className="w-full sm:w-6 bg-white"></div>

      {showNewProyectModal && (
        <NewProyectModal
          handleClickModal={handleModalView}
          handleSubmit={handleCreateNewProyect}
        />
      )}
    </div>


  )
}

export default DashboardPage

