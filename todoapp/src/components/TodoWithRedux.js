import React, { useState } from 'react'
import { addTodo, deleteAllTodo, deleteTodo,editTodo,toggleComplete } from '../features/TodoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GrSave } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";



const TodoWithRedux = () => {
    const[input,setInput]=useState('');
    const[edit,setEdit]=useState(null);
    const[editText,setEditText]=useState('');
    const[filterTasks,setFilterTasks]=useState('all');
    const dispatch=useDispatch();
    const todos=useSelector((state)=>state.todos)
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddTodo=()=>{
        if(input.trim()!==''){
            const isDuplicate=todos.some((todo)=>todo.text.toLowerCase()===input.trim().toLowerCase());
            if(isDuplicate){
              alert("This task is already exist");
              return;
            }
        
            dispatch(addTodo(input))
            setInput('');
            setSearchQuery('');
        }
    }
    const handleDeleteTodo=(id)=>{
        dispatch(deleteTodo(id))
    }
    const handleToggle=(id)=>{
       dispatch(toggleComplete(id));
    }
    const keyPressHandler=(e)=>{
        if(e.key==="Enter"){
            handleAddTodo();
        }
    }
    const handleEditTodo=(id,currentText)=>{
        setEdit(id);
        setEditText(currentText);

    }
    const handleSaveEdit = () => {
        if(editText.trim()!==''){
            dispatch(editTodo({id:edit,text:editText}));
            setEdit(null);
            setEditText('');
        }
    };
    const filteredAndSearchedTodos = todos.filter(todo => {
        const matchesFilter = 
            filterTasks === 'all' ||
            (filterTasks === 'completed' && todo.completed) ||
            (filterTasks === 'pending' && !todo.completed);
    
        const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());    
        return matchesFilter && matchesSearch;
    });
    

    // const filterTodos = todos.filter(todo => {
    //     if (filterTasks === 'completed') return todo.completed;
    //     if (filterTasks=== 'pending') return !todo.completed;
    //     return true; 
    //   });
      const handleDeleteAll = () => {
        dispatch(deleteAllTodo());
      };

  return (
    <>
    <div className='min-h-[500px] w-[600px]  bg-[#f4f4f5] rounded ml-auto mr-auto mt-10'>
        
        <span className='flex pt-8 text-white'>
        <button className='h-9 rounded w-[80px] border-zinc-900 ml-10  bg-[#15803d] '
        onClick={()=>setFilterTasks('all')}>All Todos </button>
        <button className='h-9 w-[100px]  rounded border-zinc-900 ml-12  bg-[#15803d]'
         onClick={()=>setFilterTasks('completed')}>Completed </button>
                 <button className='h-9 w-[80px]  rounded border-zinc-900 ml-12 bg-[#15803d]'
         onClick={()=>setFilterTasks('pending')}>Pending </button>
          <button className=' bg-[#15803d] w-[120px] ml-12 rounded mr-5' onClick={handleDeleteAll} >Delete All Todos</button>
         </span>
        <span className='flex mt-2 '>
        <h3 className='text-3xl ml-9 pt-5 -mb-2'>Tasks</h3>

        <div className='flex'>
            <input type='text' className='h-[35px] w-[250px] rounded-3xl mt-6 ml-[180px] pl-3' placeholder='Search your todo...'
            value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <IoIosSearch size={22} className='mt-8 -ml-8'/>
        </div> 

        {/* <div className='flex ml-5'>
        <input type='text' placeholder='  Search Todos...'  className=' border-zinc-800 rounded-3xl h-9 mt-5  ml-[150px] w-[250px] pl-3'
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        />
        <IoIosSearch size={20} className='mt-7'/>
        </div> */}
        </span>

        <div className='flex'>
        <input className='border-zinc-800  m-auto ml-10 mb-5 mt-5 pl-3  border rounded-md h-8 w-[350px] ' 
        type='text' placeholder='Add your todo here...'
         value={input} onChange={(e)=>setInput(e.target.value)}
         onKeyDown={keyPressHandler}/>
        <button className='flex ml-10 mr-[70px] mt-5 rounded-md w-[100px] h-8 bg-[#15803d] text-white' onClick={handleAddTodo}><IoIosAddCircleOutline size={18} className='mt-2 ml-2'/>
        <span className='m-auto mb-4 mt-1 text-white mr-1'>Add Tasks</span>
        </button>
        </div>
        <div>
        {

            filteredAndSearchedTodos.map((todo)=>(
                <div className='mt-3 flex ml-10 border-2  mr-20 rounded w-[490px] h-8 ' key={todo.id}>
                    <input type='checkbox' className="round-checkbox" checked={todo.completed} 
                    onClick={()=>handleToggle(todo.id)}>
                    </input>
                    <label className=''></label>
                    {edit===todo.id? (
                        <input type='text'className='
                        rounded h-6 ml-1 bg-transparent cursor-pointer outline-none' value={editText} onChange={(e)=>setEditText(e.target.value)}
                        onBlur={handleSaveEdit} autoFocus/>
                    ):(
                    <span className={todo.completed ?'line-through text-gray-700' :''}>
                        {todo.text}
                    </span>    
                        )}
                    <div className='flex m-auto -mr-6'>
                        {edit===todo.id ? (
                            <button className='mr-10' onClick={handleSaveEdit} ><GrSave size={22}/>

                            </button>
                        ) :(
                            <div>
                            <button className='rounded -mr-5 w-5' onClick={()=>handleEditTodo(todo.id,todo.text)}> <FiEdit size={22} />
                         </button>
                          <button className=' mx-10 rounded ' onClick={()=>handleDeleteTodo(todo.id)}><MdDeleteOutline size={22}/>
                          </button>
                          </div>
                        )}
                    
                    </div>
                </div>
            ))
        }
        </div>
    </div>
    </>
  )
}
export default TodoWithRedux;