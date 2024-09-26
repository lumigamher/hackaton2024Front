import React, { useEffect, useState, useRef } from 'react';
import ProyectDisplay from '../components/ui/ProyectDisplay';
import Input from '../components/ui/Input';
import AddNewProyect from '../components/ui/AddNewProyect';
import NewProyectModal from '../components/ui/NewProyectModal';
import { useAuth } from '../hooks/useAuth';
import { proyectService } from '../services/proyectService';
import StaffDisplay from '../components/StaffDisplay';
import TaskCard from '../components/ui/TaskCard';
import Cronometro from '../components/ui/Cronometro';

function DashboardPage() {
  const [showNewProyectModal, setShowNewProyectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const { logout } = useAuth();

  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await proyectService.getAllProjects();
      setProjects(await data.data);
    };
    fetchProjects();
  }, [isCreated]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const handleModalView = () => {
    setShowNewProyectModal((prev) => !prev);
    setIsCreated((prev) => !prev);
  };

  const handleCreateNewProyect = () => {
    setShowNewProyectModal((prev) => !prev);
  };

  const handleShowDetails = async (e) => {
    setProject(null);
    const { id } = e.target;
    setProject(await proyectService.getProyectById(id));
  };

  const scroll = (scrollOffset) => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollLeft += scrollOffset;

      // Update arrow visibility
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  function formatSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen sm:h-auto w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b ">
      <div className="w-full sm:w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold select-none">ChroniX</h2>
      </div>

      <div className="flex h-fit lg:h-full w-full flex-col gap-10 p-8">
        <div className="flex w-full justify-end">
          <p className="text-sm">
            <button
              onClick={logout}
              className="hover:text-red-600 hover:scale-125 hover:font-semibold pl-10 select-none -translate-x-5 duration-300"
            >
              Log out
            </button>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 select-none">Admin</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <h2 className="text-2xl font-semibold select-none">Hi, {localStorage.getItem('username')}!</h2>
            <Input
              type="text"
              className="w-full sm:w-64 rounded-lg border-2 border-gray-100 focus:border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-orange-600 select-none">Your projects</p>
          <div className="relative flex items-start space-x-4">
            <AddNewProyect handleClick={handleModalView} />
            {projects.length > 0 && (
              <div
                className="flex overflow-x-auto space-x-4  scrollbar-hide scroll-smooth flex-grow"
                ref={containerRef}
              >
                {projects.map((project) => {
                  const seconds = project.usuarios.reduce(
                    (acc, user) => acc + user.tiempoTrabajado,
                    0
                  );
                  return (
                    <ProyectDisplay
                      key={project.id}
                      projectName={project.nombre}
                      label="Hours worked"
                      showDetails={handleShowDetails}
                      id={project.id}
                      time={formatSeconds(seconds)}
                      url={project.foto}
                    />
                  );
                })}
              </div>
            )}
            {showLeftArrow && (
              <button
                onClick={() => scroll(-395)}
                className="absolute top-1/2 left-[195px] -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
              >
                &#8249; {/* Left arrow character */}
              </button>
            )}
            {showRightArrow && (
              <button
                onClick={() => scroll(395)}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
              >
                &#8250; {/* Right arrow character */}
              </button>
            )}
          </div>
        </div>

        {project && (
          <div>
            <div className="w-full flex justify-between">
              <p className="text-orange-600 mb-5 select-none">{project.nombre} staff</p>
              <button
                className="hover:text-red-600 hover:scale-125 hover:font-semibold pl-10 -translate-x-5 select-none duration-300"
                onClick={() => setProject(null)}
              >
                clear
              </button>
            </div>
            <StaffDisplay projectIn={project} />
            <div className="w-full flex justify-between">
              <p className="text-orange-600 select-none mb-5 ">{project.nombre} Task</p>
            </div>
            {/* <div className="w-full h-auto flex gap-5 flex-wrap">
              {project.tareas.map((tarea) => (
                // <Cronometro key={tarea.id} task={tarea} />
              ))}
            </div> */}
          </div>
        )}
      </div>

      <div className="w-full sm:w-6 bg-white"></div>

      {showNewProyectModal && (
        <NewProyectModal
          handleClickModal={handleModalView}
          handleSubmit={handleCreateNewProyect}
        />
      )}
    </div>
  );
}

export default DashboardPage;
