import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ProjectBanner from '../../components/project/ProjectBanner'
import { trpc } from '../../utils/trpc'
import Comments from '../../components/Comments'
import ProjectCarousel from '../../components/project/ProjectCarousel'
import ProjectInfo from '../../components/project/ProjectInfo'
import { useSession } from 'next-auth/react'
import { ShareIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import type { NextPage } from "next";

const ProjectPage: NextPage = () => {

    const router = useRouter()
    const projectId = router.query.id as string
    const { data: session } = useSession()
    const userId = session?.user?.id
    const ctx = trpc.useContext();

    const { data: project } = trpc.useQuery(['project.single-project', {
        projectId: projectId
    }])

    const { data: vote } = trpc.useQuery(['project.votes', {
        projectId: projectId,
    }], {
        select: (data) => !!data?.votes.find(vote => vote.userId === userId),
    })

    const { data: votes } = trpc.useQuery(['project.votes', {
        projectId: projectId,
    }], {
        select: (data) => data?.votes.length
    })

    const addVoteMutation = trpc.useMutation('vote.add-vote', {
        onMutate: () => {
            ctx.cancelQuery(["project.votes"]);
            const optimisticUpdate = ctx.getQueryData(["project.votes", { projectId }]);
            if (optimisticUpdate) {
                ctx.setQueryData(["project.votes"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["project.votes"]);
        }
    })

    const upVote = async () => {
        if (vote) return
        else {
            addVoteMutation.mutate({
                projectId: projectId,
                userId: userId ?? "0"
            })
        }
    }

    return (
        <main className="min-h-screen">
            <section className='flex flex-col'>
                <ProjectBanner logo={project?.image as string} banner={project?.banner as string} />
                <div className='bg-white w-4/5 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <div className="flex flex-col items-center gap-4 justify-center">
                        <h1 className="font-poppins text-3xl mt-4 font-bold">{project?.name}</h1>
                        <p className="text-justify lg:text-center font-md font-poppins">{project?.description}</p>
                    </div>
                    {session &&
                        <div className='flex justify-end'>
                            <div className="flex space-x-1 items-center p-2 cursor-pointer hover:text-primary"
                                onClick={() => upVote()}>
                                {vote ? <HeartIconFilled className="h-8 text-primary" /> : <HeartIcon className="h-8" />}
                                <p className='font-poppins text-md'>{votes ?? "0"}</p>
                            </div>
                        </div>
                    }
                </div>
            </section>
            <section className='w-4/5 mx-auto grid grid-cols-3 mt-12 gap-8'>
                <div className='col-span-2 flex flex-col space-y-12'>
                    <ProjectCarousel />
                    <Comments projectId={projectId} />
                </div>
                <div className='col-span-1 flex flex-col'>
                    <ProjectInfo project={project} />
                </div>
            </section>
        </main>
    )
}

export default ProjectPage