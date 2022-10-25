import React from 'react'
import { useAppContext } from '../context/AppContext';
import { closeCrowdfunding } from "../utils/ContractOperations";
import toast from "react-hot-toast"
import useAccount from "./hooks/useAccount";

type Props = {
    appId: string
}

function CollectFundsButton({ appId }: Props) {

    const { algodClient } = useAppContext()
    const { account } = useAccount()

    const collect = async () => {
        toast.loading("Collecting funds...", {
            id: "collect-toast"
        })
        try {
            await closeCrowdfunding(algodClient, parseInt(appId), account)
            toast.success("Funds collected successfully", {
                id: "collect-toast"
            })
        }
        catch (e) {
            toast.error("Failed to collect funds", {
                id: "collect-toast"
            })
        }
    }

    return (
        <button
            className="btn btn-primary"
            onClick={collect}>Collect Funds
        </button>
    )
}

export default CollectFundsButton