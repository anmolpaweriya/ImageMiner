import React from 'react'

export default function NavBar() {
    return (
        <nav className='h-14 w-full flex items-center box-border px-6 sm:px-32 fixed bg-white'>
            <div className='flex gap-2 items-center'>
                <img src="imageMiner.png" className='h-10' alt="" />
                <p className='font-bold text-2xl '>
                    IM</p>
            </div>
        </nav>
    )
}
