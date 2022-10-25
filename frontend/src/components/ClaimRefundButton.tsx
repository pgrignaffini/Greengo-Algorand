import React from 'react'
import { useAppContext } from '../context/AppContext';
import { sendRefunds } from "../utils/ContractOperations";
import toast from "react-hot-toast"
import useAccount from "./hooks/useAccount";

type Props = {
    appId: string
}

function ClaimRefundButton({ appId }: Props) {

    const { algodClient } = useAppContext()
    const { account } = useAccount()

    const refund = async () => {
        toast.loading("Claiming refund...", {
            id: "refund-toast"
        })
        try {
            await sendRefunds(algodClient, parseInt(appId), account)
            toast.success("Refund claimed successfully", {
                id: "refund-toast"
            })
        }
        catch (e) {
            toast.error("Failed to claim refund", {
                id: "refund-toast"
            })
        }
    }

    return (
        <button
            className="btn btn-secondary"
            onClick={refund}>Get refunded!
        </button>
    )
}

export default ClaimRefundButton