import FAQRow from "./FAQRow"

function FAQ() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">FAQs</h1>
                <p className="font-poppins text-lg">Any questions?</p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 p-2">
                <div className="flex flex-col space-y-3">
                    <FAQRow tabIndex={0}
                        question="What is Greengo?"
                        answer="Greengo is a blockchain-based platform that aims to facilitate the achievement of 2030 agenda goals by supporting innovative and sustainable projects during the funding phase by connecting incubators, accelerators, companies, creators and users through a single ecosystem."
                    />
                    <FAQRow
                        question="How does it work?"
                        answer="Greengo gives to anyone the possibility to develop their products/projects through user donation. We leverage the donation and reward crowdfunding; every user can donate through its own wallet and get access to the DAO. "
                        tabIndex={1} />
                    <FAQRow
                        question="How do I sign in to the website?"
                        answer="You can sign in by clicking on the Sign In button on the top right corner of the page. A new page will open where you can connect your wallet and Discord account. If you don't have a wallet yet, refer to the 'learn more' section and follow the steps. "
                        tabIndex={2} />
                </div>
                <div className="flex flex-col space-y-3">
                    <FAQRow
                        question="How do I donate to a project?"
                        answer="You can find in the section 'Projects' a list of all live projects. By clicking on a project you will get redirected to the project's page. 
                        At the bottom of the page you will find a 'Donate to this project' section where you can decide the amount to donate. Sign the transaction through your wallet and you are done. Congrats! You just donate for a good cause
                        "
                        tabIndex={3} />
                    <FAQRow
                        question="How the rewards work?"
                        answer="After a successful donation transaction, you will receive an amount of GNG Token proportional to the total amount of your donation. The reward-donation ratio can vary based on the campaign."
                        tabIndex={4} />
                    <FAQRow
                        question="What chains are supported?"
                        answer="We currently support CELO Mainnet and Alfajores Testnet. We are planning to add more blockchain in the future. "
                        tabIndex={5} />
                </div>
            </div>
        </div>
    )
}

export default FAQ