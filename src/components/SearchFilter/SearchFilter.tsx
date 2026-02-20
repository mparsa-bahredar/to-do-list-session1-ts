import React, { useState, useMemo } from 'react'
import FilterModal from '../FilterModal/FilterModal'
import AddTaskModal from '../AddTaskModal/AddTaskModal'
import Add from '../../icons/Add'
import { saveTasks, type Task } from '../../database/database'
import debounce from 'lodash.debounce'


const SearchFilter = ({setTasks, filters, setFilters}: {setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  filters: {search: string, priority: '' | 'High' | 'Medium' | 'Low', category: string, startTime?: number, endTime?: number}
  setFilters: React.Dispatch<React.SetStateAction<{search: string, priority: '' | 'High' | 'Medium' | 'Low', category: string
  startTime?: number, endTime?: number}>>}) => {

  const [title, setTitle] = useState<string>('')
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilters(prev => ({
          ...prev,
          search: value
        }))
      }, 2000),
    [setFilters]
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }


  const addTask = () => {
    if (!title.trim()) return
    const newTask: Task = {
      id: Date.now(),
      title,
      description: '',
      completed: false, 
      priority: 'Medium',
      category: ''
    }
    setTasks((prev) => {
      const updated = [...prev, newTask]
      saveTasks(updated)
      return updated
    })
    setTitle('')
  }
  const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }

  

  return(
    <div className='flex w-full justify-between relative'>
      <div className='flex gap-2'>
        <button 
          onClick={() => setIsOpenFilterModal(prev => !prev)}
          className='px-3 h-9 font-medium text-sm text-[#404040] border border-[2px] border-[#E4E4E4] rounded-lg cursor-pointer
          dark:text-[#F5F5F5] dark:border-[#F5F5F5]'>
          Filter
        </button>
        <input onChange={onSearchChange} defaultValue={filters.search} type='text' placeholder='Search tasks...'
        className='w-[320px] h-9 pl-2 font-regular text-sm text-left text-[#A3A3A3] bg-[#F5F5F5] outline-none focus:ring-1 
        focus:ring-[#E4E4E4] rounded-lg   dark:text-[#F5F5F5] dark:bg-gray-500'/>
      </div>
      <div className='flex gap-2'>
        <div className='flex p-1 pl-2 bg-[#F5F5F5] rounded-lg   dark:bg-gray-500'>
          <input value={title} type="text" placeholder='Enter the task title' onKeyDown={handleTaskKeyDown} 
          onChange={(e) => {setTitle(e.target.value)}} 
          className='font-regular text-sm text-[#A3A3A3] outline-none dark:text-[#F5F5F5]'/>
          <button 
            onClick={() => setIsOpenAddModal(prev => !prev)} 
            className='flex items-center gap-1 pr-2 pl-1 h-7 font-medium text-xs text-[#FFFFFF] bg-[#404040] rounded-lg cursor-pointer
            dark:bg-gray-800'>
            <Add className='w-4 h-4 text-[#FFFFFF]'/>
            <span>More</span>
          </button>
        </div>
        <button onClick={addTask} className='h-9 px-3 font-medium text-sm text-[#FFFFFF] bg-[#1E88E5] rounded-lg cursor-pointer'>
          Add
        </button>
      </div>

      {isOpenFilterModal && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          setIsOpenFilterModal={setIsOpenFilterModal}
        />
      )}
      {isOpenAddModal && (
        <AddTaskModal
          setTasks={setTasks}
          setIsOpenAddModal={setIsOpenAddModal}
        />
      )}
    </div>
  )
}

export default SearchFilter
