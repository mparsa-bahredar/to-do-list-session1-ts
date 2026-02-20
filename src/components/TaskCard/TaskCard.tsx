import React, { useState } from 'react'
import { type Task, saveTasks } from '../../database/database'   
import Delete from '../../icons/Delete'
import Edit from '../../icons/Edit'
import EditTaskModal from '../EditTaskModal/EditTaskModal'
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal'


const PRIORITY_STYLES: Record<Task['priority'], string> = {
  High: "text-[#EB5757] border-[#EB5757] bg-red-50   dark:bg-red-900/20",
  Medium: "text-amber-600 border-amber-600 bg-amber-50   dark:bg-amber-900/20",
  Low: "text-green-600 border-green-600 bg-green-50   dark:bg-green-900/20",
};



const TaskCard = ({ item, setTasks }: { setTasks:React.Dispatch<React.SetStateAction<Task[]>>, item: Task }) => {

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const toggleComplete = () => {
    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === item.id
          ? { ...task, completed: !task.completed }
          : task
      )
      saveTasks(updated)
      return updated
    })
  }

  const onDelete = () => {
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== item.id)
      saveTasks(updated)
      return updated
    })
  }


  return(
    <div className='flex items-center w-full p-2 bg-[#FFFFFF] rounded-lg   dark:bg-gray-600'>
      <div className='pr-3'>
        <input onChange={toggleComplete} type="checkbox" checked={item.completed} className='w-3 h-3 cursor-pointer'/>
      </div>
      <div className='w-[116px] text-sm font-medium text-[#404040]   dark:text-[#F5F5F5]'>
        <h4>{item.title}</h4>
      </div>
      <div  className='w-[260px] text-sm font-regular text-[#404040]   dark:text-[#F5F5F5]'>
        <p>{item.description}</p>
      </div>
      <div className='flex justify-center w-24'>
        <div className={`py-1 px-4 text-sm font-regular ${PRIORITY_STYLES[item.priority]} rounded-[48px]`}>
          <span>{item.priority}</span>
        </div>
      </div>
      <div className='flex justify-center w-30 text-sm font-regular text-[#404040]   dark:text-[#F5F5F5]'>
        <span>{item.category}</span>
      </div>
      <div className='flex justify-center w-22 text-sm font-regular text-[#404040]   dark:text-[#F5F5F5]'>
        <span>{item.startTime ? new Date(item.startTime).toLocaleDateString() : '-'}</span>
      </div> 
      <div className='flex justify-center w-22 text-sm font-regular text-[#404040]   dark:text-[#F5F5F5]'>
        <span>{item.endTime ? new Date(item.endTime).toLocaleDateString() : '-'}</span>
      </div>
      <div className='flex gap-2 pl-10'>
        <button onClick={() => {setIsOpenEditModal((prev) => !prev)}} className='cursor-pointer'>
          <Edit className='w-4 h-4 text-[#404040]   dark:text-[#F5F5F5]'/>
        </button>
        <button onClick={() => {setIsOpenDeleteModal((prev) => !prev)}} className='cursor-pointer'>
          <Delete className='w-4 h-4 text-[#EB5757]'/>
        </button>
      </div>
      {
        isOpenEditModal && (
          <EditTaskModal item={item} setTasks={setTasks} setIsOpenEditModal={setIsOpenEditModal}/>
        )
      }
      {
        isOpenDeleteModal && (
          <DeleteTaskModal item={item} onDelete={onDelete} setIsOpenDeleteModal={setIsOpenDeleteModal}/>
        )
      }
    </div>
  )
}

export default TaskCard