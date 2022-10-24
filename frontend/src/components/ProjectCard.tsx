import Link from 'next/link'
import React from 'react'
import { Project } from "@prisma/client"

type Props = {
    project: Project
}

function ProjectCard({ project }: Props) {

    const startDate = new Date(project?.start as string)
    const endDate = new Date(project?.end as string)
    const isOver = new Date() > endDate
    const hasNotStarted = startDate > new Date()

    return (
        <Link href={`/project/${project?.id}`}>
            <div className={`bg-base-100 rounded-xl h-64 shadow-xl cursor-pointer ring-2 ${isOver ? "ring-red-500" : hasNotStarted ? "ring-blue-400" : "ring-green-500"}`}>
                <div className='relative h-3/4'>
                    <img className='w-full h-full rounded-t-xl object-cover' src={project?.banner || "/blank.png"} alt="banner" />
                    <div className='flex space-x-6 absolute -bottom-12 left-12 items-end '>
                        <img className='rounded-xl w-16 h-16 object-cover ring ring-secondary ring-offset-base-100 ring-offset-4' src={project?.image || "/blank.png"} alt="logo" />
                        <p className='font-poppins text-xl font-semibold uppercase text-left whitespace-normal mt-16'>{project?.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard