import React from 'react'
import { trpc } from '../../utils/trpc'
import { useSession } from "next-auth/react"
import ProjectCard from '../ProjectCard'
import SkeletonCard from '../SkeletonCard'

function LikedProjects() {

    const { data, isLoading } = trpc.useQuery(['vote.liked-projects'])

    return (
        <div>
            <h1 className='font-poppins text-3xl font-semibold mb-12'>Liked projects:</h1>
            <div className='grid grid-cols-2 gap-8'>
                {isLoading && <SkeletonCard cards={8} />}
                {data?.map((item) => (
                    <div key={item?.project?.id} >
                        <ProjectCard attributes={item?.project} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LikedProjects