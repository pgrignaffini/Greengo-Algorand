import React from 'react'
import { trpc } from '../../utils/trpc'
import type { Project } from '@prisma/client'
import { DotSpinner } from "@uiball/loaders"
import Link from 'next/link'

function ProfileBody() {

    const { data: projects, isLoading } = trpc.useQuery(['project.all-projects'])

    return (
        <div className="mt-4 bg-base-100 rounded-3xl z-0">
            <h1 className="font-bold text-xl font-poppins p-4">Projects you believed in:</h1>
            <div className="carousel carousel-center p-4 space-x-8 bg-transparent ">
                {isLoading && <div className='w-auto mx-auto my-4'><DotSpinner /></div>}
                {projects?.map((project: Project, index: number) => (
                    <Link href={`/project/${project.id}`} key={index}>
                        <div className="carousel-item cursor-pointer group">
                            <div className="flex flex-col">
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={project?.image || "/blank.png"} alt="carousel-item" />
                                    </div>
                                </div>
                                <p className="text-center w-24 font-poppins truncate group-hover:underline group-hover:text-info">{project?.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default ProfileBody