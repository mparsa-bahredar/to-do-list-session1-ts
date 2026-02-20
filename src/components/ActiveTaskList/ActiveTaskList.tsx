import React from 'react'
import { type Task } from '../../database/database'
import TaskTableTitle from '../TaskTableTilte/TaskTableTitle'
import TaskCard from '../TaskCard/TaskCard'


const ActiveTaskList = ({ setTasks, activeTasks }: { setTasks:React.Dispatch<React.SetStateAction<Task[]>>, activeTasks: Task[] }) => {
  
  return (
    <div className='flex flex-col gap-3 items-start'>
      <h3 className='font-semibold text-base text-[#404040]   dark:text-[#F5F5F5]'>Active Tasks :</h3>
      <div className='flex flex-col gap-3 w-full p-3 rounded-lg bg-[#F5F5F5]   dark:bg-gray-500'>
        <TaskTableTitle/>
        <div className='flex flex-col gap-2 w-full max-h-[160px] overflow-y-auto scrollbar'>
          {activeTasks.length === 0 ? (
            <div className='flex justify-center w-full'>
              <p className='font-regular text-base text-[#404040]   dark:text-[#F5F5F5]'>No Tasks</p>
            </div>
          ) : (
            activeTasks.map((item) => (
              <TaskCard item={item} key={item.id} setTasks={setTasks}/>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ActiveTaskList

