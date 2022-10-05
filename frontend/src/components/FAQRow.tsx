import React from 'react'

function FAQRow({ tabIndex, question, answer }: { tabIndex: number, question: string, answer: string }) {
    return (
        <div className='collapse border border-primary'>
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-base-100  text-primary-content peer-checked:text-secondary-content">
                <p className='font-montserrat'>{question}</p>
            </div>
            <div className="collapse-content bg-base-100 text-primary-content  peer-checked:text-secondary-content">
                <p className='font-montserrat'>{answer}</p>
            </div>
        </div>
    )
}

export default FAQRow