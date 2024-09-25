import { useEffect, useState } from "react"
import StaffCard from "./ui/StaffCard"

function StaffDisplay({ projectIn = false }) {

  const [project, setProject] = useState(projectIn)
  const [users, setUsers] = useState(projectIn.usuarios)

  useEffect(() => {
    console.log(users);

  }, [users])


  return (

    <div className='w-full h-auto flex gap-5  select-none flex-wrap'>
      {users.length > 0 ? (
        users.map(user => (
          <StaffCard
          key={user.id}
          name={user.nombre}
          workedTime={user.tiempoTrabajado}
          />
        ))
      ) : null}
    </div>
  )
}

export default StaffDisplay


