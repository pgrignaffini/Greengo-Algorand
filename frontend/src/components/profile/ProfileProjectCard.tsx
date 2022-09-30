import React from 'react'

function ProfileProjectCard({ banner, category }: { banner: string, category: string }) {
    return (
        <div className='rounded-xl grid grid-rows-6 h-56 shadow-xl'>
            <div className='row-span-4'>
                <img src={banner} className='object-fill w-full h-full rounded-t-xl' />
            </div>
            <div className='row-span-2 flex flex-col px-2 mt-4'>
                <h1 className='font-bold text-xl font-poppins'>Project Name</h1>
                <p className='font-montserrat'>Category: {category}</p>
            </div>
        </div>
    )
}

export default ProfileProjectCard