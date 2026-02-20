
const TaskTableTitle = () => {

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex'>
        <div className='flex pl-8 w-[148px]'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Title</h4>
        </div>
        <div className='w-[260px]'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Description</h4>
        </div>
        <div className='flex justify-center w-24'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Priority</h4>
        </div>
        <div className='flex justify-center w-30'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Category</h4>
        </div>
        <div className='flex justify-center w-22'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Start Time</h4>
        </div>
        <div className='flex justify-center w-22'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>End Time</h4>
        </div>
        <div className='flex pl-9'>
          <h4 className='font-medium text-sm text-[#404040]   dark:text-[#F5F5F5]'>Actions</h4>
        </div>
      </div>
      <div className='h-[1px] bg-[#404040] rounded-[48px]   dark:bg-[#F5F5F5]'></div>
    </div>
  )
}

export default TaskTableTitle