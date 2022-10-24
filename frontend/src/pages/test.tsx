import React from 'react'
import ConnectAlgoSigner from '../components/ConnectAlgoSigner'
import useAccount from '../components/hooks/useAccount'
import ProjectCarousel from '../components/project/ProjectCarousel'

function TestPage() {

    const { account, isConnected } = useAccount()

    console.log({ isConnected, account })

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <ConnectAlgoSigner />
        </div>
    )
}

export default TestPage