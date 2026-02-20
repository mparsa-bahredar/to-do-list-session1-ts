import React from 'react'
import { type Task } from '../../database/database'


const DeleteTaskModal = ({ item, onDelete, setIsOpenDeleteModal }: { item: Task, onDelete: () => void, 
  setIsOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>}) => {


  return (
    <>
      <div onClick={() => setIsOpenDeleteModal(false)} className='bg-black/20 fixed inset-0 z-40'/>
      <div className='flex flex-col items-center gap-4 p-6 bg-[#FFFFFF] rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.1)] -translate-x-1/2 
      -translate-y-1/2 fixed top-1/2 left-1/2 z-64   dark:bg-gray-600'>
        <h4 className='font-medium text-base text-[#404040]   dark:text-[#F5F5F5]'>Are you sure to remove "{item.title}"?</h4>
        <div className='flex justify-center gap-2 w-full'>
          <button onClick={() => setIsOpenDeleteModal(false)} 
          className='py-2 px-3 font-medium text-sm text-[#FFFFFF] bg-[#A3A3A3] rounded-lg cursor-pointer   dark:bg-gray-500'>
            Cancel
          </button>
          <button onClick={() => {onDelete(); setIsOpenDeleteModal(false)}}
          className='py-2 px-3 font-medium text-sm text-[#FFFFFF] bg-[#EB5757] rounded-lg cursor-pointer'>Delete</button>
        </div>
      </div>
    </>
  )
}

export default DeleteTaskModal
