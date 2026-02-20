import React, { useState } from 'react'
import Close from '../../icons/Close'
import { getCategories, saveTasks, type Task } from '../../database/database'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'



const EditTaskModal = ({ item, setTasks, setIsOpenEditModal }: { item:Task, setTasks:React.Dispatch<React.SetStateAction<Task[]>>,
  setIsOpenEditModal: (value: boolean) => void }) => {

  const [title, setTitle] = useState<string>(item.title)
  const [description, setDescription] = useState<string>(item.description)
  const [priority, setPriority] = useState<Task['priority']>(item.priority)
  const [category, setCategory] = useState<string>(item.category)
  const categories = getCategories(); 
  const [startTime, setStartTime] = useState<number | undefined>(item.startTime)
  const [endTime, setEndTime] = useState<number | undefined>(item.endTime)


  const editTask = () => {
    if (!title.trim()) return
    setTasks((prev) => {
      const updated = prev.map(t => t.id === item.id ? { ...t, title, description, priority, category, startTime, endTime } : t)
      saveTasks(updated)
      return updated
    })
    setIsOpenEditModal(false)
  }

  return (
    <>
      <div onClick={() => setIsOpenEditModal(false)} className='bg-black/20 fixed inset-0 z-40'/>
      <div className='flex flex-col gap-4 p-6 bg-[#FFFFFF] rounded-xl shadow-[0_0_8px_rgba(0,0,0,0.1)] -translate-x-1/2 
      -translate-y-1/2 fixed top-1/2 left-1/2 z-64   dark:bg-gray-600'>
        <div className='flex justify-between w-[400px]'>
          <h3 className='font-semibold text-xl text-[#404040]   dark:text-[#F5F5F5]'>Edit Task</h3>
          <div onClick={() => setIsOpenEditModal(false)}>
            <Close className='w-5 h-5 text-[#404040] cursor-pointer   dark:text-[#F5F5F5]'/>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-start gap-2'>
              <h4 className='w-full font-medium text-base text-left text-[#404040]   dark:text-[#F5F5F5]'>Title :</h4>
              <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} placeholder='Enter the task name'
              className='w-[400px] py-2 pl-2 font-regular text-sm text-left text-[#525252] bg-[#F5F5F5] outline-none focus:ring-2 
              focus:ring-[#E4E4E4] rounded-lg
              dark:text-[#F5F5F5] dark:bg-gray-500'/>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <h4 className='w-full font-medium text-base text-left text-[#404040]   dark:text-[#F5F5F5]'>Description :</h4>
              <input onChange={(e) => setDescription(e.target.value)} type="text" value={description} 
              placeholder='Enter the task description'
              className='w-[400px] py-2 pl-2 font-regular text-sm text-left text-[#525252] bg-[#F5F5F5] outline-none focus:ring-2 
              focus:ring-[#E4E4E4] rounded-lg
              dark:text-[#F5F5F5] dark:bg-gray-500'/>
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='w-full font-medium text-base text-left text-[#404040]   dark:text-[#F5F5F5]'>Priority :</h4>
              <select value={priority} onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
              className='py-2 px-2 w-[400px] font-regular text-sm text-[#404040] border border-[#E4E4E4] rounded-xl
              dark:bg-gray-500 dark:text-[#F5F5F5]'>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <h4 className='w-full font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]'>Category :</h4>
              <select
                value={category} onChange={(e) => setCategory(e.target.value)}
                className='w-[400px] h-9 px-2 font-regular text-sm text-[#404040] border border-[#E4E4E4] rounded-xl 
                dark:bg-gray-500 dark:text-[#F5F5F5]'>
                <option value="">-- Select category (optional) --</option> 
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]">Start Time :</h4>
              <DatePicker
                value={startTime ? new Date(startTime) : null} onChange={(date) => setStartTime(date?.toDate().getTime())}
                plugins={[<TimePicker position="bottom" />]} format="YYYY/MM/DD HH:mm" className="w-[400px] h-9"/>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]">End Time :</h4>
              <DatePicker
                value={endTime ? new Date(endTime) : null} onChange={(date) => setEndTime(date?.toDate().getTime())}
                plugins={[<TimePicker position="bottom" />]} format="YYYY/MM/DD HH:mm" className="w-[400px] h-9"/>
            </div>
          </div>
          <button onClick={editTask} type='button' 
          className='w-full py-2 font-medium text-sm text-[#FFFFFF] bg-[#1E88E5] rounded-lg cursor-pointer'>Save</button>
        </div>
      </div>
    </>
  )
}

export default EditTaskModal