import React from 'react'
import ClaimRefundButton from '../components/ClaimRefundButton'
import CollectFundsButton from '../components/CollectFundsButton'
import ConnectAlgoSigner from '../components/ConnectAlgoSigner'
import useAccount from '../components/hooks/useAccount'
import ProjectCarousel from '../components/project/ProjectCarousel'

function TestPage() {

    const { account, isConnected } = useAccount()

    console.log({ isConnected, account })

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <CollectFundsButton appId='0' />
            <ClaimRefundButton appId='0' />
        </div>
    )
}

export default TestPage