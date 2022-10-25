import type { Project, User, Comment } from "@prisma/client"
import Discord from "../logos/Discord";
import Twitter from "../logos/Twitter";
import { GlobeAltIcon, MailIcon } from "@heroicons/react/outline"
import ProfileCard from "../profile/ProfileCard";
import type { FormEvent } from "react"
import { optInApp, sendFunds } from "../../utils/ContractOperations";
import { CONSTANTS } from '../../constants/Constants';
import { useAppContext } from '../../context/AppContext';
import useAccount from "../hooks/useAccount";
import toast from "react-hot-toast"
import { trpc } from "../../utils/trpc";
import ClaimRefundButton from "../ClaimRefundButton";
import { useSession } from "next-auth/react";
import CollectFundsButton from "../CollectFundsButton";

function ProjectInfo({ project }: {
    project: (Project & {
        creator: User;
        comments: Comment[];
    }) | null | undefined
}) {

    const { account, isConnected } = useAccount()
    const { data: session } = useSession()
    const { algodClient } = useAppContext()
    const startDate = new Date(project?.start as string)
    const endDate = new Date(project?.end as string)
    const isOver = new Date() > endDate
    const hasNotStarted = startDate > new Date()

    const fundProject = trpc.useMutation("fundedProject.fund-project", {
        onSuccess: () => {
            toast.success("Funds sent successfully", {
                id: "funding-toast"
            })
        },
        onError: () => {
            toast.error("Failed to send funds", {
                id: "funding-toast"
            })
        }
    })

    const { data: totalFunded } = trpc.useQuery(['fundedProject.funded-project-amount', {
        projectId: project?.id as string
    }])

    const totalFundedAmount = totalFunded ? totalFunded[0]?._sum.amount : 0
    const progress = (totalFundedAmount && project?.goal) ? Math.round((totalFundedAmount / parseFloat(project?.goal)) * 100) : 0
    const hasReachedGoal = progress >= 100
    const isCreator = session?.user?.id === project?.creatorId

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            amount: event.currentTarget.amount.value,
        }

        if (data.amount <= 0 || data.amount.length === 0) {
            return
        }

        let amount = parseFloat(data.amount)
        amount -= CONSTANTS.PLATFORM_FEE

        toast.loading("Sending funds, please sign the transactions", {
            id: "funding-toast"
        })

        const accountInfo = await algodClient.accountInformation(account).do();
        const isOptedIn = accountInfo["apps-local-state"].filter((app: any) => String(app.id) === project?.appId)
        if (!isOptedIn.length) {
            try {
                await optInApp(algodClient, parseInt(project?.appId as string), account)
            }
            catch (e) {
                toast.error("Failed to opt in to app", {
                    id: "funding-toast"
                })
                return
            }
        }

        if (account && project?.id) {
            await sendFunds(algodClient, parseInt(project?.appId as string), account, amount)
            fundProject.mutate({
                account,
                projectId: project?.id,
                amount
            })
        }

    }

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
                    <div className="flex flex-col space-y-2">
                        <p className="font-montserrat text-center">Goal: {project?.goal} ALGO</p>
                        {totalFunded && <p className="font-montserrat text-center">Collected: {totalFundedAmount ?? 0} ALGO</p>}
                        <progress className="progress progress-primary" value={progress} max="100"></progress>
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
                                <p className="cursor-pointer hover:underline hover:text-info">
                                    <a
                                        href={`https://twitter.com/${project?.twitter}`}
                                        target="_blank"
                                        rel="noreferrer noopener">{project?.twitter}</a>
                                </p>
                            </div>
                        }
                        {project?.website &&
                            <div className="flex space-x-4 items-center">
                                <GlobeAltIcon className="w-6 h-6 text-secondary" />
                                <p className="cursor-pointer hover:underline hover:text-info">
                                    <a
                                        href={`${project?.website}`}
                                        target="_blank"
                                        rel="noreferrer noopener">{project?.website}</a>
                                </p>
                            </div>}
                        {project?.email &&
                            <div className="flex space-x-4 items-center">
                                <MailIcon className="w-6 h-6 text-secondary" />
                                <p>{project?.email}</p>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {!isOver && <form onSubmit={(e) => handleSubmit(e)}>
                            <label className="label">
                                <span className="label-text">Donate to this project:</span>
                            </label>
                            <label className="input-group">
                                <input type="text" id="amount" placeholder="0.01" className="input input-bordered" required />
                                <span>ALGO</span>
                            </label>
                            {isConnected && <button type="submit" className="mt-4 btn btn-primary w-full" disabled={hasNotStarted}>Donate</button>}
                        </form>}
                        {isOver && !hasReachedGoal && !isCreator && <ClaimRefundButton appId={project?.appId as string} />}
                        {isOver && hasReachedGoal && isCreator && <CollectFundsButton appId={project?.appId as string} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectInfo