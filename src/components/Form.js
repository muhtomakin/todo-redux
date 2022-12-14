import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTodosAsync } from '../redux/todos/services';
import Error from "./Error";
import Loading from "./Loading";

function Form() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.addNewTodoLoading);
  const error = useSelector(state => state.addNewTodoError);

  const handleSubmit = async (e) => {
    if(!title) return;
    e.preventDefault();
    dispatch(addTodosAsync({ title }));
    setTitle('');
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'center'}}
    >
      <input 
        className="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus 
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
}

export default Form;