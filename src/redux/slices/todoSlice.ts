import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [
    { _id: "1", title: "Test Title", description: "Test Description" }
];


const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<any>) => {
            const { _id, title, description } = action.payload;
            state.push({ _id, title, description });
        },

        deleteTodo: (state, action: PayloadAction<any>) => {
            const todoId = action.payload;
            return state.filter((todo: any) => todo._id !== todoId);
        }
    }
});

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;