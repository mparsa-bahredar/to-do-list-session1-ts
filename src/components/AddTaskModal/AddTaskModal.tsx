import Close from '../../icons/Close'
import React, { useState } from 'react'
import { saveTasks, type Task, getCategories, saveCategories } from '../../database/database'
import Asterisk from '../../icons/Asterisk'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'


const AddTaskModal = ({ setTasks, setIsOpenAddModal }: { 
    setTasks:React.Dispatch<React.SetStateAction<Task[]>>,
    setIsOpenAddModal: (value: boolean) => void 
}) => {

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium')
    const [categories, setCategories] = useState(getCategories())
    const [category, setCategory] = useState<string>('')
    const [newCategory, setNewCategory] = useState<string>('')
    const [startTime, setStartTime] = useState<number>()
    const [endTime, setEndTime] = useState<number>()    


    const addNewCategory = () => {
        if (!newCategory.trim()) return
        if (!categories.includes(newCategory.trim())) {
            const updated = [...categories, newCategory.trim()]
            saveCategories(updated)   
            setCategories(updated)
        }
        setCategory(newCategory.trim())
        setNewCategory('')
    }
    const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addNewCategory()
    }



    const addTask = () => {
        if (!title.trim()) return
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            completed: false, 
            priority,
            category,
            startTime,
            endTime
        }
        setTasks((prev) => {
            const updated = [...prev, newTask]
            saveTasks(updated)
            return updated
        })
        setIsOpenAddModal(false)
    }
    const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.key === 'Enter') addTask()
    }



  return(
    <>
        <div onClick={() => setIsOpenAddModal(false)} className='bg-black/20 fixed inset-0 z-40'/>
        <div className='flex flex-col gap-4 p-6 bg-[#FFFFFF] shadow-[0_0_8px_rgba(0,0,0,0.1)] rounded-xl -translate-x-1/2 
        -translate-y-1/2 fixed top-1/2 left-1/2 z-64   dark:bg-gray-600'> 
            <div className='flex justify-between w-full'>
                <h3 className='font-semibold text-xl text-[#404040] dark:text-[#F5F5F5]'>Add Task</h3>
                <div onClick={() => setIsOpenAddModal(false)}>
                    <Close className='w-5 h-5 text-[#404040] cursor-pointer dark:text-[#F5F5F5]'/>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <h4 className='font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]'>Title :</h4>
                            <Asterisk className='w-3 h-3 text-[#EB5757]'/>
                        </div>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleTaskKeyDown}
                            type="text"
                            value={title}
                            placeholder='Enter the task name'
                            className='w-[400px] h-9 pl-2 font-regular text-sm text-left text-[#525252] bg-[#F5F5F5] outline-none 
                            focus:ring-1 focus:ring-[#E4E4E4] rounded-lg   dark:text-[#F5F5F5] dark:bg-gray-500'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='w-full font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]'>Description :</h4>
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyDown={handleTaskKeyDown}
                            type="text"
                            value={description} 
                            placeholder='Enter the task description'
                            className='w-[400px] h-9 pl-2 font-regular text-sm text-left text-[#525252] bg-[#F5F5F5] outline-none 
                            focus:ring-1 focus:ring-[#E4E4E4] rounded-lg   dark:text-[#F5F5F5] dark:bg-gray-500'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='w-full font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]'>Priority :</h4>
                        <select value={priority} onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                        onKeyDown={handleTaskKeyDown}    
                        className='w-[400px] h-9 px-2 font-regular text-sm text-[#404040] border border-[#E4E4E4] rounded-xl
                        dark:bg-gray-500 dark:text-[#F5F5F5]'>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <h4 className='w-full font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]'>Category :</h4>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                        onKeyDown={handleTaskKeyDown}
                        className='w-[400px] h-9 px-2 font-regular text-sm text-[#404040] border border-[#E4E4E4] rounded-xl 
                        dark:bg-gray-500 dark:text-[#F5F5F5]'>
                            <option value="">-- Select category (optional) --</option> 
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyDown={handleNewCategoryKeyDown}
                                placeholder='Enter the new category'
                                className='w-full h-9 pl-2 font-regular text-sm text-[#525252] bg-[#F5F5F5] outline-none focus:ring-1
                                focus:ring-[#E4E4E4] rounded-lg dark:text-[#F5F5F5] dark:bg-gray-500'
                            />
                            <button onClick={addNewCategory}
                            className='py-2 px-4 font-medium text-sm text-[#404040] bg-[#1E88E5] rounded-lg dark:text-[#F5F5F5]'>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]">Start Time :</h4>
                        <DatePicker value={startTime ? new Date(startTime) : null}
                        onChange={(date) => setStartTime(date?.toDate().getTime())}
                        plugins={[<TimePicker position="bottom" />]}
                        format="YYYY/MM/DD HH:mm" 
                        inputClass='w-full h-9 text-[#404040] indent-2 bg-[#F5F5F5] rounded-xl   dark:text-[#F5F5F5] dark:bg-gray-500'
                        containerClassName="custom-calendar"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="font-medium text-base text-left text-[#404040] dark:text-[#F5F5F5]">End Time :</h4>
                        <DatePicker value={endTime ? new Date(endTime) : null}
                        onChange={(date) => setEndTime(date?.toDate().getTime())}
                        plugins={[<TimePicker position="bottom" />]}
                        format="YYYY/MM/DD HH:mm" 
                        inputClass='w-full h-9 text-[#404040] indent-2 bg-[#F5F5F5] rounded-xl   dark:text-[#F5F5F5] dark:bg-gray-500'
                        containerClassName="custom-calendar"/>
                    </div>
                </div> 
                <button onClick={addTask} type='button' 
                className='w-full h-9 font-medium text-sm text-[#FFFFFF] bg-[#1E88E5] rounded-lg cursor-pointer'>
                    Add
                </button>
            </div>
        </div>
    </>
  )
}

export default AddTaskModal
