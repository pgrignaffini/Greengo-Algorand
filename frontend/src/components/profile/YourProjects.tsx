import React from 'react'
import { trpc } from '../../utils/trpc'
import { useSession } from "next-auth/react"
import ProjectCard from '../ProjectCard'
import SkeletonCard from '../SkeletonCard'

function YourProjects() {

    const { data: session } = useSession()
    const { data: projects, isLoading } = trpc.useQuery(['project.user-projects', {
        creatorId: session?.user?.id || '1'
    }])

    return (
        <div>
            <h1 className='font-poppins text-3xl font-semibold mb-12'>Your projects:</h1>
            <div className='grid grid-cols-2 gap-8'>
                {isLoading && <SkeletonCard cards={8} />}
                {projects?.map((project) => (
                    <div key={project.id} >
                        <ProjectCard attributes={project} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YourProjects