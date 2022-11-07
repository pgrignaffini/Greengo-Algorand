/*global AlgoSigner*/
import React from "react";
import toast from "react-hot-toast"
import makeBlockie from "ethereum-blockies-base64"
import { signIn, useSession } from "next-auth/react";

const ConnectAlgoSigner = () => {

    const [account, setAccount] = React.useState();
    const [isConnected, setIsConnected] = React.useState(false);
    const { data: session } = useSession();

    const connectAlgoSigner = async () => {
        if (typeof AlgoSigner !== "undefined" && typeof window !== 'undefined') {
            await AlgoSigner.connect();
            const accounts = await AlgoSigner.accounts({
                ledger: "TestNet"
            });
            setAccount(accounts[0]["address"]);
            setIsConnected(true);
            toast.success("Account connected successfully")
        } else {
            toast.error("This browser doesn't have the AlgoSigner extension installed")
        }
    };

    return (
        <div>
            {isConnected ? !session && <div className="flex space-x-2 items-center">
                <button className="btn btn-sm btn-outline btn-primary ml-3 normal-case" onClick={() => signIn("discord", { callbackUrl: '/profile' })}>
                    Sign In
                </button>
                <label htmlFor="account-modal">
                    <img src={makeBlockie(account)} className="peer rounded-full w-8 h-8 cursor-pointer" />
                </label>
            </div> :
                <button className="p-2 rounded-md bg-gradient-to-tr from-primary to-secondary shadow-md" onClick={connectAlgoSigner}>
                    <p className="lg:inline font-poppins text-inherit">Connect Wallet</p>
                </button>}
        </div>
    )
}

export default ConnectAlgoSigner