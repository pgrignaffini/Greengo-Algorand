import React from 'react'
import { useSession } from "next-auth/react"
import Instagram from "../logos/Instagram"
import Facebook from "../logos/Facebook"
import { trpc } from '../../utils/trpc'
import type { Project, User } from '@prisma/client'
import { DotSpinner } from "@uiball/loaders"
import Link from 'next/link'

type Props = {
    user?: User
}

function ProfileCard({ user }: Props) {


    const { data: session } = useSession()
    const { data: projects, isLoading } = trpc.useQuery(['project.all-projects'])

    return (
        <>
            <div className='p-5'>
                <div className='flex space-x-4 items-center'>
                    <img src={user?.image || session?.user?.image as string} className="w-24 rounded-full" />
                    <div className='flex items-center'>
                        <h1 className='text-4xl font-bold font-poppins'>{user?.name || session?.user?.name as string}</h1>
                        <div className='w-12 cursor-pointer'><Instagram /></div>
                        <div className='w-12 cursor-pointer'><Facebook /></div>
                    </div>
                </div>
                <div className='flex justify-evenly space-x-5 mt-10'>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-bold text-2xl'>102</h1>
                        <p className='font-montserrat'>Donations</p>
                    </div>
                    <div className='divider-horizontal' />
                    <div className='flex flex-col items-center'>
                        <h1 className='font-bold text-2xl'>14</h1>
                        <p className='font-montserrat'>Projects created</p>
                    </div>
                    <div className='divider-horizontal' />
                    <div className='flex flex-col items-center'>
                        <h1 className='font-bold text-2xl'>102</h1>
                        <p className='font-montserrat'>Donations</p>
                    </div>

                </div>
            </div>
            <div className="mt-4 bg-base-100 rounded-3xl z-0">
                <h1 className="font-bold text-xl font-poppins p-4">Funded projects:</h1>
                <div className="carousel carousel-center p-4 space-x-8">
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
        </>
    )
}

export default ProfileCard