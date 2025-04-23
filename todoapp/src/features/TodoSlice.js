import { createSlice } from "@reduxjs/toolkit";

const TodoSlice=createSlice({
    name:"todos",
    initialState:[],
    reducers:{
        addTodo:(state,action)=>{
            const newTodo={
                id:Math.random()*100,
                text:action.payload,
                completed:false,
                date:new Date(),
            };
            state.push(newTodo);
        },
        deleteTodo:(state,action)=>{
            const index= state.findIndex((todo)=>todo.id===action.payload);
            if(index!==-1){
                state.splice(index,1)
            }
        },
        toggleComplete:(state,action)=>{
            const todo=state.find((todo)=>todo.id===action.payload);
            if(todo){
                todo.completed = !todo.completed
            }
        },
        editTodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
              state[index].text = action.payload.text;
            }
        },
        deleteAllTodo:()=>{
            return [];
        }
        ,searchTodo:(state,action)=>{
            state.setQuery=action.payload;
        }
            
        // searchTodo: (state, action) => {
        //     state.searchList = state.list.filter(
        //       (todo) => (todo.date).toDateString() === (action.payload.date).toDateString()
        //     );
        // }            
    }

})

export const {addTodo,deleteTodo,toggleComplete,editTodo,searchTodo,deleteAllTodo} = TodoSlice.actions;
export default TodoSlice.reducer;
