import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function LandingPage() {

  return (
    <div className="flex h-screen w-screen justify-between  bg-gradient-to-b from-gray-50 to-gray-300">

      <div className="w-6 bg-white">
        <h2 className="translate-y-7 rotate-90 font-bold">ChroniX</h2>
      </div>


      <div className="w-full grid grid-cols-3">
        <div className="col-start-2 col-end-3 flex flex-col justify-center items-center gap-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal transition-transform duration-500 ease-in-out transform ">
            Welcome to
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold transition-transform duration-500 ease-in-out transform">
            ChroniX
          </h2>
          <button 
          className="mt-5 rounded-2xl bg-white px-12 py-2 sm:px-16 lg:px-20 text-sm font-normal text-gray-600 shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg">
            <Link to="/register"> Get Started</Link>
          </button>
        </div>

        <button className="hover:scale-110 transition-transform duration-300 col-start-4 col-end-5 self-start -translate-x-5 w-fit place-self-end mt-4 text-sm sm:text-base lg:text-lg">
          <Link to="/login"> login </Link>
        </button>
      </div>


      <div className="w-6 bg-white" />
    </div>


  )
}

export default LandingPage
