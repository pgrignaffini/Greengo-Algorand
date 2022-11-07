import Link from "next/link"
import React from "react";
import SearchBar from "./SearchBar"
import { signIn, signOut, useSession } from "next-auth/react";
import makeBlockie from "ethereum-blockies-base64"
import useAccount from "./hooks/useAccount";
import ConnectAlgoSigner from "./ConnectAlgoSigner";
import { useRouter } from "next/router";

function Header() {

    const { data: session } = useSession();
    let AlgoSigner: any;
    const [account, setAccount] = React.useState();
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        checkAccount();
    }, [])

    const checkAccount = async () => {
        if (typeof AlgoSigner !== "undefined" && typeof window !== 'undefined') {
            await AlgoSigner.connect();
            const accounts = await AlgoSigner.accounts({
                ledger: "TestNet"
            });
            setAccount(accounts[0]["address"]);
            setIsConnected(true);
        }
    }

    console.log(isConnected, account)

    const accountModal = (
        <>
            <input type="checkbox" id="account-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-3xl">
                    <label htmlFor="account-modal" className="text-primary text-xl absolute right-4 top-4 cursor-pointer">✕</label>
                    <h3 className="text-lg font-bold">Connected account: </h3>
                    <p className="py-4 cursor-pointer hover:underline hover:text-info">
                        <a
                            href={`https://goalseeker.purestake.io/algorand/testnet/account/${account}`}
                            target="_blank"
                            rel="noreferrer noopener">{account}</a>
                    </p>
                </div>
            </div>
        </>
    )

    return (
        <header className="fixed top-0 right-0 bg-base-100 left-0 z-50">
            {accountModal}
            <div className="p-7 max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <Link href={"/"}>
                        <a className="font-bold text-4xl text-primary font-pacifico">Greengo</a>
                    </Link>
                    <div className="hidden md:inline-flex">
                        <SearchBar placeholder="Search a project..." />
                    </div>
                    <div className="hidden xl:flex xl:space-x-7">
                        <Link href={"/projects"}>
                            <a className="text-primary font-montserrat text-xl">Projects</a>
                        </Link>
                        <Link href={"/#FAQ"}>
                            <a className="text-primary font-montserrat text-xl">FAQ</a>
                        </Link>
                    </div>
                    {!isConnected && !session && <ConnectAlgoSigner />}
                    {session &&
                        (<div className="flex space-x-2 items-center">
                            <Link href="/profile">
                                <a className="btn btn-sm btn-outline btn-primary normal-case">Profile</a>
                            </Link>
                            <button className="btn btn-sm btn-outline btn-primary normal-case" onClick={() => {
                                signOut({ callbackUrl: '/' })
                            }}>
                                <p>Sign Out</p>
                            </button>
                            <label htmlFor="account-modal">
                                <img src={session?.user?.image as string} className="peer rounded-full w-8 h-8 cursor-pointer" />
                            </label>
                        </div>)}
                </div>
            </div>
        </header>
    )
}

export default Header
