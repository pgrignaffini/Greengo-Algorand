/*global AlgoSigner*/

import { useState, useEffect } from 'react';

function useAccount() {

    const [account, setAccount] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getUserAccount()
    }, [account, isConnected]);

    const getUserAccount = async () => {
        const account = await AlgoSigner.accounts({
            ledger: "TestNet",
        });
        setAccount(account[0]["address"])
        setIsConnected(true)
    };

    return { account, isConnected };
}

export default useAccount;