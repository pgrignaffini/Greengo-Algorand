import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function ProjectCard({ attributes }: { attributes: any }) {

    return (
        <Link href={`/project/${attributes?.id}`}>
            <div className="bg-base-100 rounded-xl h-64 shadow-xl cursor-pointer">
                <div className='relative h-3/4'>
                    <img className='w-full h-full rounded-t-xl object-cover' src={attributes?.banner || "/blank.png"} alt="banner" />
                    <div className='flex space-x-6 absolute -bottom-12 left-12 items-end '>
                        <img className='rounded-xl w-16 h-16 object-cover ring ring-secondary ring-offset-base-100 ring-offset-4' src={attributes?.image} alt="logo" />
                        <p className='font-poppins text-xl font-semibold uppercase text-left whitespace-normal mt-16'>{attributes?.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard