import type { Project, User, Comment } from "@prisma/client"
import Discord from "../logos/Discord";
import Twitter from "../logos/Twitter";
import { GlobeAltIcon, MailIcon } from "@heroicons/react/outline"
import ProfileCard from "../profile/ProfileCard";

function ProjectInfo({ project }: {
    project: (Project & {
        creator: User;
        comments: Comment[];
    }) | null | undefined
}) {

    const startDate = new Date(project?.start as string)
    const endDate = new Date(project?.end as string)
    const isOver = new Date() > endDate
    const hasNotStarted = startDate > new Date()

    const profileModal = (
        <>
            <input type="checkbox" id="profile-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <ProfileCard user={project?.creator} />
                </div>
            </div>
        </>
    )

    return (
        <>
            {profileModal}
            <div className='bg-white shadow-lg mx-auto rounded-lg p-5 w-full'>
                <div className="flex justify-between">
                    <p className="font-poppins font-bold text-2xl">Project Info</p>
                    {isOver && <p className="font-poppins font-bold text-2xl text-error">Ended</p>}
                    {hasNotStarted && <p className="font-poppins font-bold text-2xl text-info">Not started</p>}
                    {!isOver && !hasNotStarted && <p className="font-poppins font-bold text-2xl text-success">Ongoing</p>}
                </div>
                <div className="flex flex-col space-y-4 mt-8">
                    <p className="font-montserrat font-bold ">Creator:</p>
                    <div className="flex items-center space-x-4">
                        <img src={project?.creator?.image as string} className="rounded-full w-16" alt="creator" />
                        <label htmlFor="profile-modal">
                            <p className="hover:underline hover:text-info cursor-pointer">{project?.creator?.name}</p>
                        </label>
                    </div>
                    <div>
                        <p className="font-montserrat">{hasNotStarted ? "Starts" : "Started"}: {startDate.toDateString()}</p>
                        <p className="font-montserrat">{isOver ? "Ended" : "Ends"}: {endDate.toDateString()}</p>
                    </div>
                    <div>
                        <p className="font-montserrat text-center">Goal: {project?.goal} cUSD</p>
                        <progress className="progress progress-primary" value="70" max="100"></progress>
                    </div>
                    <div className="space-y-4 pt-4">
                        {project?.discord &&
                            <div className="flex space-x-4 items-center">
                                <div className='w-6 h-6'>
                                    <Discord />
                                </div>
                                <p>{project?.discord}</p>
                            </div>
                        }
                        {project?.twitter &&
                            <div className="flex space-x-4 items-center">
                                <div className='w-6 h-6'>
                                    <Twitter />
                                </div>
                                <p>{project?.twitter}</p>
                            </div>
                        }
                        {project?.website &&
                            <div className="flex space-x-4 items-center">
                                <GlobeAltIcon className="w-6 h-6 text-secondary" />
                                <p>{project?.website}</p>
                            </div>}
                        {project?.email &&
                            <div className="flex space-x-4 items-center">
                                <MailIcon className="w-6 h-6 text-secondary" />
                                <p>{project?.email}</p>
                            </div>
                        }
                    </div>
                    <div className="flex justify-center items-end space-x-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Donate to this project:</span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="0.01" className="input input-bordered" />
                                <span>cUSD</span>
                            </label>
                        </div>
                        <button className="btn btn-primary w-fit" disabled={isOver || hasNotStarted}>Donate</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectInfo