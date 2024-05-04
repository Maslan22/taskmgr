import React from 'react'

interface FormContainerProps {
    children: any
}
export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="mt-10 text-center"> 
        <div className="form p-4 rounded-md shadow-md w-96 inline-block bg-slate-100">
            {children}
            </div>
            </div>
  )
}
