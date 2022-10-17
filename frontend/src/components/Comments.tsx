import { useState } from "react"
import TimeAgo from 'react-timeago'
import toast from "react-hot-toast"
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc"

function Comments({ projectId }: { projectId: string }) {

    const { data: session } = useSession()
    const { data: comments } = trpc.useQuery(['comment.project-comments', {
        projectId: projectId
    }])
    const [comment, setComment] = useState("")
    const ctx = trpc.useContext();
    const createComment = trpc.useMutation("comment.create-comment", {
        onMutate: () => {
            ctx.cancelQuery(["comment.project-comments"]);
            const optimisticUpdate = ctx.getQueryData(["comment.project-comments", { projectId }]);
            if (optimisticUpdate) {
                ctx.setQueryData(["comment.project-comments"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["comment.project-comments"]);
        }
    })

    const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast.loading("Posting your comment...", {
            id: "comment-toast",
        })
        createComment.mutate({
            projectId: projectId,
            text: comment,
        }, {
            onSuccess: () => {
                toast.success("Comment posted!", {
                    id: "comment-toast",
                })
            },
            onError: () => {
                toast.error("Failed to post comment", {
                    id: "comment-toast",
                })
            }
        })
        setComment("")
    }

    return (
        <div className="bg-white shadow-lg mt-7 p-5 border rounded-t-2xl rounded-b-2xl scrollbar-hide overflow-y-scroll">
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Comments</h3>
            </div>
            {comments && (
                <div className="ml-6 max-h-screen overflow-y-scroll scrollbar-hide scrollbar-thumb-black scrollbar-thin">
                    {comments?.map(comment => (
                        <div key={comment?.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment?.user?.image as string} />
                            <p className="text-sm flex-1">
                                <span className="font-bold">{comment?.user?.name}</span>
                                {" "}{comment?.text}
                            </p>
                            <div className="flex items-center space-x-2">
                                <TimeAgo className="text-sm px-4" date={comment?.createdAt} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {session ?
                <form className="flex items-center p-4 border-t" onSubmit={sendComment}>
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border-none bg-white flex-1 focus:ring-0 outline-none"
                    />
                    <button type="submit" disabled={!comment.trim()} className="font-semibold text-primary hover:text-primary-focus cursor-pointer">Comment</button>
                </form>
                :
                <h1 className="p-3 font-poppins text-md">You need to sign in to post a comment!</h1>
            }
        </div>
    )
}

export default Comments