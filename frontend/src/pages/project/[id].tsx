import React from 'react'
import { useRouter } from 'next/router'
import ProjectBanner from '../../components/project/ProjectBanner'
import { trpc } from '../../utils/trpc'
import ProjectDetails from '../../components/project/ProjectDetails'

function ProjectPage() {

    const router = useRouter()
    const projectId = router.query.id as string

    const { data: project } = trpc.useQuery(['project.single-project', {
        projectId: projectId
    }])

    return (
        <div className="min-h-screen">
            <div className='flex flex-col'>
                <ProjectBanner logo={project?.image as string} banner={project?.banner as string} />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-4/5 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <ProjectDetails project={project} />
                </div>
            </div>
        </div>
    )
}

export default ProjectPage