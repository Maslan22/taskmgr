import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface TableProps {
    headers: any,
    data: any,
    editUrl: string,
    deleteHandler: (e: number) => void,
    createClick: () => void
}
export default function Table({ headers, data, editUrl, deleteHandler,createClick} : TableProps) { 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg inline-block">
        <div className='bg-white p-2 text-right'>
        <button
        type="button" onClick={createClick}
        className="inline-block rounded bg-blue-700 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
        data-twe-ripple-init
        data-twe-ripple-color="light">
        Create
    </button> 
        </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50"> 
            <tr>{
                headers.map((header: any) => {
                return (
                <th key={header.id} scope="col" className="px-6 py-3">
                    {header.name}
                </th> )
                })
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row: any) => {
                    return (
                        <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                        {  
                            Object.keys(row).map((item: any) => {
                                return (
                                    <td key={item} className="px-6 py-4">
                                        {row[item]}
                                    </td>
                                )
                            })
                        } 
                        <td className="px-6 py-4 space-x-2">
                    <Link to={`${editUrl}/${row.id}/edit`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                    <span onClick={() => deleteHandler(row.id)} className="cursor-pointer font-medium text-red-400 hover:underline">Delete</span>
                </td>
                        </tr>
                    )
                })
            } 
        </tbody>
    </table>
</div>
  )
}
