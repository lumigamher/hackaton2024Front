import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


function Button(props: Props) {
    return (
        <button
        className="mt-5 w-[300px] h-[50px] rounded-[25px] bg-white px-12 py-2 text-[20px] font-normal text-gray-600 shadow-md transition-transform duration-300 hover:shadow-lg sm:px-16 lg:px-20 text-center focus:border-transparent focus:outline-none"
        {...props}
        >
        </button>
    )
}

export default Button;
