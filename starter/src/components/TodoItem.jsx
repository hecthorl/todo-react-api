import { useDispatch } from 'react-redux';
import { toggleCompletedAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
   const dispatch = useDispatch();

   const handleCompletedClick = () => {
      dispatch(toggleCompletedAsync({ id, completed: !completed }));
   };

   const handleDelete = () => {
      dispatch(deleteTodoAsync({ id }));
   };

   return (
      <li
         className={`list-group-item ${completed && 'list-group-item-success'}`}
      >
         <div className="d-flex justify-content-between">
            <span className="d-flex align-items-center">
               <input
                  style={{ width: '30px', height: '30px' }}
                  type="checkbox"
                  checked={completed}
                  className="mr-3"
                  onChange={handleCompletedClick}
               />
               {'>'} {title}
            </span>
            <button onClick={handleDelete} className="btn btn-danger">
               Delete
            </button>
         </div>
      </li>
   );
};

export default TodoItem;
