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
        activeFilter: 'all',
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        toggle: (state, action) => {
            const { id } = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed = !item.completed;
        },
        destroy: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter(item => item.id !== id);
            state.items = filtered;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false);
            state.items = filtered;
        }
    },
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
    addTodo, 
    toggle, 
    destroy,
    changeActiveFilter,
    clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;