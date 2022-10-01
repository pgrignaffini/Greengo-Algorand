import type { Project, User, Comment } from "@prisma/client"

function ProjectDetails({ project }: { project: Project & { creator: User; comments: Comment[]; } | null | undefined }) {
    return (
        <div>
            <div className="flex flex-col items-center gap-4 justify-center">
                <h1 className="font-poppins text-3xl mt-4 font-bold">{project?.name}</h1>
                <div className="flex space-x-4">
                    {/* <SocialIcon url="https://twitter.com/imaginaryones" />
                <SocialIcon url="https://instagram.com/imaginaryones" />
                <SocialIcon url="https://discord.gg/imaginaryones" /> */}
                </div>
                <p className="text-justify lg:text-center font-md font-poppins">{project?.description}</p>
                {/* <CollectionStats total={total} owners={owners} /> */}
            </div>
            <p className="font-montserrat mb-2">Creator:</p>
            <div className="flex items-center space-x-4">
                <img src={project?.creator?.image as string} className="rounded-full w-16" alt="creator" />
                <p>{project?.creator?.name}</p>
            </div>
        </div>
    )
}

export default ProjectDetails
