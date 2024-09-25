import React from 'react';

function AddNewProyect({ handleClick }) {
    return (
        <div 
            onClick={handleClick} 
            className="flex h-[175px] w-[175px] flex-col justify-between items-center duration-300 cursor-pointer hover:scale-[1.05] rounded-[24px] bg-[url('https://img.freepik.com/vector-gratis/diseno-fondo-aventura-plana_23-2149054485.jpg')] bg-center bg-cover p-5 border-[rgba(0,0,0,0.08)]"
            style={{ 
                minWidth: '175px', 
                minHeight: '175px', 
                maxWidth: '175px', 
                maxHeight: '175px', 
                boxShadow: 'inset 0 0 5px 2px rgba(255, 255, 255, 0.5)', // Borde interior blanquito
            }}
        >
            <button className="self-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                    <path fill="white" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"></path>
                </svg>
            </button>
            <button className="self-start rounded-xl select-none bg-white px-3 py-2 text-sm duration-150 cursor-default">
                New Proyect
            </button>
        </div>
    );
}

export default AddNewProyect;
