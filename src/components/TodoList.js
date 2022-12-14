import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { selectFilteredTodos } from '../redux/todos/todosSlice';
import {
    toggleTodosAsync,
    getTodosAsync,
    removeTodosAsync
} from '../redux/todos/services';
import Error from './Error';
import Loading from './Loading';

function TodoList() {
    const dispatch = useDispatch();
    const filteredItems = useSelector(selectFilteredTodos);
    const isLoading = useSelector(state => state.todos.isLoading);
    const error = useSelector(state => state.todos.error);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    const handleDestroy = async (id) => {
        if (window.confirm("Are you sure?")) {
          await dispatch(removeTodosAsync(id));
        }
    };

    const handleToggle = async (id, completed) => {
        await dispatch(toggleTodosAsync({id, data:{ completed }}));
    }

    if(isLoading === true) {
        return <Loading />
    }

    if(error) {
        return <Error message={error}/>
    }

    return (
        <ul className='todo-list'>
            {filteredItems.map((item) => {
                return(
                    <li key={item.id} className={item.completed ? 'completed' : ''}>
                        <div className='view'>
                            <input 
                                className='toggle' 
                                type='checkbox' 
                                checked={item.completed}
                                onChange={() => handleToggle(item.id, !item.completed)}
                            />
                            <label>{item.title}</label>
                            <button 
                                className='destroy'
                                onClick={() => handleDestroy(item.id)}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TodoList
