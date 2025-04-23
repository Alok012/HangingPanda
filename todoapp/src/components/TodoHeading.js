import React from 'react'
import TodoWithRedux from './TodoWithRedux'

const TodoHeading = () => {
  return (
    <>
    <div className=' ml-[310px] mr-auto'>  
    <h1 className='text-5xl text-center ml-40 pt-10 mb-5 bg-green-950 h-[120px] text-white
    w-[600px] m-auto '>Todo App</h1>
    </div>
    <TodoWithRedux/>
    </>
  )
}

export default TodoHeading;