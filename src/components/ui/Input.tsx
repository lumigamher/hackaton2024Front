import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input(props: Props) {
  return (
    <input 
      className="w-[300px] h-[50px] rounded-[25px] bg-white text-[20px] font-normal text-gray-600 shadow-md transition-transform duration-300 hover:shadow-lg sm:px-16 lg:px-20 text-center focus:border-transparent focus:outline-none"
      {...props}
    />
  )
}

export default Input;