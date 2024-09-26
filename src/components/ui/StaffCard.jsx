import React from 'react'

function StaffCard({name, workedTime}) {
    return (
        <div className=" mt-3 mb-3 w-full sm:h-auto lg:w-[390px] lg:h-[175px] border-2 border-gray-100 rounded-[24px] grid grid-rows-[70%_30%] p-3">
            <div className="w-full h-full flex justify-between items-center pb-5 px-3">
                <img
                    src=""
                    alt="profile pic"
                    className="w-[70px] h-[70px] rounded-full border-2 border-gray-100"
                />
                <div className="flex justify-center w-full items-center gap-5">
                    <img
                        src=""
                        alt="project img"
                        className="w-[70px] h-[70px] rounded-xl border-2 border-gray-100 bg-gray "
                    />
                </div>
            </div>
            <div className="w-full h-full  flex justify-between px-2">
                <p className="text-center h-full flex items-center border-2 border-gray-100 px-2 rounded-2xl">
                    {name}
                </p>
                <div className="flex flex-col text-center items-end">
                    <p className="text-gray-400">Hours worked</p>
                    <p className="text-2xl"> {workedTime}</p>
                </div>
            </div>
        </div>

    )
}

export default StaffCard
