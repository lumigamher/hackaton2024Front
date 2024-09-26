import ProyectDisplay from '../components/ui/ProyectDisplay';
import Input from '../components/ui/Input';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { proyectService } from '../services/proyectService';
import StaffDisplay from '../components/StaffDisplay';
import TaskCard from '../components/ui/TaskCard';
import { userService } from '../services/userService';
import Cronometro from '../components/ui/Cronometro';

function UserDashboardPage() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const { logout } = useAuth();

  /* Drag  */
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walkX = (x - startX) * 0.5;
    containerRef.current.scrollLeft = scrollLeft - walkX;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await userService.getAllProjects();
      console.log(data);

      setProjects(await data.data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log(project);
  }, [project]);

  const handleShowDetails = async (e) => {
    setProject(null);
    const { id } = e.target;
    setProject(await proyectService.getProyectById(id));
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen sm:h-auto w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-b">
      <div className="w-full sm:w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold select-none">ChroniX</h2>
      </div>

      <div className="flex h-fit lg:h-full w-full flex-col gap-3 p-8">
        <div className="flex w-full justify-end">
          <p className="text-sm">
            <button
              onClick={logout}
              className="hover:text-red-600 hover:scale-125 hover:font-semibold pl-10  select-none -translate-x-5 duration-300"
            >
              Log out
            </button>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 select-none">User</p>
          <div className="flex flex-col sm:flex-row gap-5">
            <h2 className="text-2xl font-semibold select-none">Hi, User!</h2>
            <Input
              type="text"
              className="w-full sm:w-64 rounded-lg border-2 border-gray-100 focus:border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-orange-600 select-none">Your projects</p>
          <div
            className="w-full overflow-x-auto flex"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: 'grab' }}
          >
            <Cronometro></Cronometro>
            <div className="flex min-w-max gap-5">
              {projects?.map((project) => {
                const totalHours = project.usuarios.reduce(
                  (acc, user) => user.username = localStorage.getItem("username") ? acc + user.tiempoTrabajado : 0,
                  0
                );
                return (
                  <ProyectDisplay
                    key={project.id}
                    projectName={project.nombre}
                    label="Hours worked"
                    showDetails={handleShowDetails}
                    id={project.id}
                    time={totalHours}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {project && (
          <div>
            <div className="w-full flex justify-between">

            </div>
            <div className="w-full flex justify-between">
              <p className="text-orange-600 select-none ">{project.nombre} Task</p>
              <button
                className="hover:text-red-600 hover:scale-125 hover:font-semibold pl-10 -translate-x-5 select-none duration-300"
                onClick={() => setProject(null)}
              >
                clear
              </button>
            </div>
            <div className="w-full h-auto flex gap-5 flex-wrap">
              {project.tareas.map((tarea) => (
                <TaskCard key={tarea.id} task={tarea} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full sm:w-6 bg-white"></div>
    </div>
  );
}

export default UserDashboardPage;