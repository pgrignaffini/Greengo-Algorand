import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonCard({ cards }: { cards: number }) {
    return (
        <>
            {Array(cards).fill(0).map((_, i) =>
            (
                <div className="h-64" key={i}>
                    <div className='relative h-full'>
                        <Skeleton borderRadius="0.75rem" className='w-full h-full' />
                        <div className='absolute bottom-6 left-12  '>
                            <Skeleton circle width={70} height={70} />
                            <Skeleton className='ml-32 flex-1' />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SkeletonCard