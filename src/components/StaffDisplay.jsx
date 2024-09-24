import { useEffect, useState } from "react"
import StaffCard from "./ui/StaffCard"

function StaffDisplay({ projectIn = false }) {

  const [project, setProject] = useState([])

  useEffect(() => {
    console.log(project);

  }, [project])


  return (

    <div className='w-full h-auto bg-black'>
      {project ? (
        project.map(user => (
          <StaffCard
            key={user.id}
            name={user.name}
          />
        ))
      ) : null}
    </div>
  )
}

export default StaffDisplay


