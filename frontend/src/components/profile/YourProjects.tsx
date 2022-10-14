import React from 'react'
import { trpc } from '../../utils/trpc'
import { useSession } from "next-auth/react"
import ProjectCard from '../ProjectCard'
import SkeletonCard from '../SkeletonCard'
import { XCircleIcon } from "@heroicons/react/outline"
import toast from "react-hot-toast"

function YourProjects() {

    const { data: session } = useSession()
    const [projectIdToDelete, setProjectIdToDelete] = React.useState("")
    const ctx = trpc.useContext();
    const creatorId = session?.user?.id || '1'

    const { data: projects, isLoading } = trpc.useQuery(['project.user-projects', {
        creatorId
    }])

    const deleteProject = trpc.useMutation("project.delete-project", {
        onMutate: () => {
            toast.loading("Deleting project...", {
                id: "project-toast",
            })
            ctx.cancelQuery(["project.user-projects"]);
            const optimisticUpdate = ctx.getQueryData(["project.user-projects", { creatorId }]);
            if (optimisticUpdate) {
                ctx.setQueryData(["project.user-projects"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["project.user-projects"]);
        },
        onSuccess: () => {
            toast.success("Project deleted!", {
                id: "project-toast",
            })
        }
    })

    const deleteProjectModal = (
        <>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this project?</h3>
                    <p className="py-4">Any not-claimed funds sent to this project will be lost!</p>
                    <div className="modal-action">
                        <label htmlFor="delete-modal" className="btn btn-primary" onClick={() => {
                            deleteProject.mutate({
                                projectId: projectIdToDelete
                            })
                        }}>Yes!</label>
                        <label htmlFor="delete-modal" className="btn btn-error">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div>
            {deleteProjectModal}
            <h1 className='font-poppins text-3xl font-semibold mb-12'>Your projects:</h1>
            <div className='grid grid-cols-2 gap-8'>
                {isLoading && <SkeletonCard cards={8} />}
                {projects?.map((project) => (
                    <div key={project.id} >
                        <label htmlFor="delete-modal" className="cursor-pointer" onClick={() => setProjectIdToDelete(project.id)}>
                            <XCircleIcon className="h-10 w-10 z-10 relative right-4 top-5 text-error cursor-pointer hover:scale-125 transition-all duration-500 ease-in-out" />
                        </label>
                        <ProjectCard attributes={project} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YourProjects