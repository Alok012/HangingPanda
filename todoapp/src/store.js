import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./features/TodoSlice"
// import counterReducer from "./features/CounterSlice"
const store=configureStore({
    reducer:{
        // counter:counterReducer,
        todos:todoReducer
    }
})
export default store;