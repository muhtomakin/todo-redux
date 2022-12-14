import { createSlice } from "@reduxjs/toolkit";
import { addTodosAsync, clearTodosAsync, getTodosAsync, removeTodosAsync, toggleTodosAsync } from "./services";


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        activeFilter: localStorage.getItem('activeFilter'),
        isLoading: false,
        error: null,
        addNewTodoLoading: false,
        addNewTodoError: null,
    },
    reducers: {
        // addTodo: {
        //     reducer: (state, action) => {
        //         state.items.push(action.payload);
        //     },
        //     prepare: ({ title }) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false,
        //             }
        //         }
        //     }
        // },
        // toggle: (state, action) => {
        //     const { id } = action.payload;
        //     const item = state.items.find(item => item.id === id);
        //     item.completed = !item.completed;
        // },
        // destroy: (state, action) => {
        //     const id = action.payload;
        //     const filtered = state.items.filter(item => item.id !== id);
        //     state.items = filtered;
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        // clearCompleted: (state) => {
        //     const filtered = state.items.filter(item => item.completed === false);
        //     state.items = filtered;
        // }
    },
    extraReducers: {
        [getTodosAsync.pending]: (state) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        [addTodosAsync.pending]: (state) => {
            state.addNewTodoLoading = true;
        },
        [addTodosAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoLoading = false;
        },
        [addTodosAsync.rejected]: (state, action) => {
            state.addNewTodoLoading = false;
            state.addNewTodoError = action.error.message;
        },
        [toggleTodosAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].completed = completed;
        },
        [removeTodosAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1);
        },
        [clearTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const selectTodos = state => state.todos.items;
export const selectActiveFilter = state => state.todos.activeFilter;

export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === 'all') {
        return state.todos.items;
    }

    return state.todos.items.filter((item) =>
        state.todos.activeFilter === 'active' 
            ? item.completed === false 
            : item.completed === true
        )
}
export const {  
    changeActiveFilter,
    clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;