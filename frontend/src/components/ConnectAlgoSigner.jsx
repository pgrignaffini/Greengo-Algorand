/*global AlgoSigner*/
import React from "react";
import toast from "react-hot-toast"
import useAccount from "./hooks/useAccount";
import makeBlockie from "ethereum-blockies-base64"

const ConnectAlgoSigner = () => {

    const { isConnected, account } = useAccount()

    const connectAlgoSigner = async () => {
        if (typeof AlgoSigner !== "undefined" && typeof window !== 'undefined') {
            await AlgoSigner.connect();
            toast.success("Account connected successfully")
        } else {
            toast.error("This browser doesn't have the AlgoSigner extension installed")
        }
    };

    return (
        <div>
            {isConnected ? <img src={makeBlockie(account)} /> :
                <button className="p-2 rounded-md bg-gradient-to-tr from-primary to-secondary shadow-md" onClick={connectAlgoSigner}>
                    <p className="lg:inline font-poppins text-inherit">Connect Wallet</p>
                </button>}
        </div>
    )
}

export default ConnectAlgoSigner