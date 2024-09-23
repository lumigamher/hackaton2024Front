import React from 'react'

export default function UserAvailableModal({name}) {
    return (
        <div className="flex items-center  justify-around">
            <img
                src="https://cdn.discordapp.com/attachments/1179372530029563924/1287773470058614848/image.png?ex=66f2c400&is=66f17280&hm=337fa830c6e2aa72a351beab959372c09311fae141a0d3f80ecb7b7cb76a443a&"
                alt=""
                className="w-16  h-16 bg-white rounded-full object-cove "
            />
            <p className="border-2 border-gray-200 hover:bg-green-400 hover:text-white px-5 py-2 rounded-xl"> {name} </p>
        </div>
    )
}
