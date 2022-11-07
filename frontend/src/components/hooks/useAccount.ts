/*global AlgoSigner*/
import { useState, useEffect } from 'react';

function useAccount() {

    const [account, setAccount] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);
    let AlgoSigner: any;

    useEffect(() => {
        getUserAccount()
    }, [AlgoSigner]);

    const getUserAccount = async () => {
        if (typeof AlgoSigner !== 'undefined') {
            const account = await AlgoSigner.accounts({
                ledger: "TestNet",
            });
            setAccount(account[0]["address"])
            setIsConnected(true)
        }
    };

    return { account, isConnected };

}

export default useAccount;