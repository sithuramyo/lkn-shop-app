import React from 'react'

interface Props {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const IconCard = ({ icon, title, subtitle }: Props) => {
    return (
        <div className='flex flex-row h-14 w-40 rounded-lg gap-3'>
            <div className='bg-accent p-4 h-14 w-14 rounded-md'>
                {icon}
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-sm'>{title}</p>
                <p className='text-sm font-bold'>{subtitle}</p>
            </div>
        </div>
    )
}

export default IconCard