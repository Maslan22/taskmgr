import dayjs from 'dayjs'
import React from 'react'

interface CardProps {
    title: string,
    description: string,
    btnTitle: string,
    btnClick: () => void,
    date: string,
    isAttendee: boolean
}
export default function Card({title, description, btnTitle, btnClick,date, isAttendee}: CardProps) {
  return (
    <div
  className="block rounded-lg bg-slate-100 p-6 text-surface shadow-secondary-1 w-72">
  <h5 className="mb-2 text-xl font-medium leading-tight">{ title}</h5>
  <p className="mb-4 text-base text-sm">
    { description}
  </p>
    <p className="mb-4 text-base text-sm text-slate-400">
        {dayjs(date).format('DD MMM YYYY')} 
    </p>
{isAttendee &&
    <div className='text-center'>
  <button
    type="button" onClick={btnClick}
    className="inline-block rounded bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
    data-twe-ripple-init
    data-twe-ripple-color="light">
    { btnTitle}
  </button>
    </div>
  }
</div>
  )
}
