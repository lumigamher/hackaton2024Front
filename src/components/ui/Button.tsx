import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


function Button(props: Props) {
    return (
        <button
        className="items-center w-[300px] h-[50px] rounded-[25px] bg-white text-[20px] font-normal text-gray-600 shadow-md transition-transform duration-300 hover:shadow-lg text-center focus:border-transparent focus:outline-none"
        {...props}
        >
        </button>
    )
}

export default Button;
