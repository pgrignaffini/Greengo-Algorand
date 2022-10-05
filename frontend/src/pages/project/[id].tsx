import React from 'react'
import { useRouter } from 'next/router'
import ProjectBanner from '../../components/project/ProjectBanner'
import { trpc } from '../../utils/trpc'
import ProjectDetails from '../../components/project/ProjectDetails'
import Comments from '../../components/Comments'
import ProjectCarousel from '../../components/project/ProjectCarousel'
import ProjectInfo from '../../components/project/ProjectInfo'

function ProjectPage() {

    const router = useRouter()
    const projectId = router.query.id as string

    const { data: project } = trpc.useQuery(['project.single-project', {
        projectId: projectId
    }])

    return (
        <main className="min-h-screen">
            <section className='flex flex-col'>
                <ProjectBanner logo={project?.image as string} banner={project?.banner as string} />
                <div className='bg-white w-4/5 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <ProjectDetails project={project} />
                </div>
            </section>
            <section className='w-4/5 mx-auto grid grid-cols-3 mt-12 gap-8'>
                <div className='col-span-2 flex flex-col space-y-12'>
                    <ProjectCarousel />
                    <Comments projectId={projectId} />
                </div>
                <div className='col-span-1 flex flex-col'>
                    <ProjectInfo />
                </div>
            </section>
        </main>
    )
}

export default ProjectPage