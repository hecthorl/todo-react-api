import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
   const dispatch = useDispatch();

   const todos = useSelector(state => state.todos);

   useEffect(() => {
      dispatch(getTodosAsync());
   }, [dispatch]);

   return (
      <ul className="list-group">
         {todos.map(({ id, title, completed }) => (
            <TodoItem key={id} id={id} title={title} completed={completed} />
         ))}
      </ul>
   );
};

export default TodoList;
