import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodos: (state, action:PayloadAction<any>) => {  
            state.splice(0, state.length, ...action.payload);
        },

        addTodo: (state, action: PayloadAction<any>) => {
            const { _id, title, description } = action.payload;
            if(!state.some((todo : any) => todo._id === _id)){
                state.push({ _id, title, description });
            }
        },

        deleteTodo: (state, action: PayloadAction<any>) => {
            const todoId = action.payload;
            return state.filter((todo: any) => todo._id !== todoId);
        }
    }
});

export const { addTodo, addTodos, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;