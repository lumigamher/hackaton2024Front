import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }


function Button(props: Props) {
    return (
        <button
            className='mt-5 rounded-2xl bg-white px-12 py-2 text-sm font-normal text-gray-600 shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg sm:px-16 lg:px-20 text-center'
            {...props}
        >
        </button>
    )
}

export default Button;
