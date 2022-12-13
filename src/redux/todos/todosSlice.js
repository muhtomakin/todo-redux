import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: 1,
                title: 'Learn React',
                completed: true,
            },
            {
                id: 2,
                title: 'Learn Redux',
                completed: false,
            },
            {
                id: 3,
                title: 'Learn Flutter',
                completed: false,
            },
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        }
    },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;