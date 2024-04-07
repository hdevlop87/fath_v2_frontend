import React from 'react'
import Image from 'next/image'


const Avatar = ({ avatarUrl, status }) => {

    const statusColor = status === 'online' ? 'bg-green-normal' : 'bg-red-normal';

    return (
      <div className="flex flex-col justify-start items-start relative ">
        <div className="flex flex-col justify-center items-center w-10 h-10 ">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full bg-cover bg-no-repeat bg-center"
          />
        </div>
        <div className={`w-2 h-2 absolute left-8 top-8 rounded-xl ${statusColor}`} />
      </div>
    )
  }


export default Avatar
