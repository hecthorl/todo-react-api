import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
   const itemsChecked = state =>
      state.todos.filter(todo => {
         return todo.completed === true;
      });
   const completedTodo = useSelector(itemsChecked);
   return (
      <h4 className="mt-3">Total Complete Items: {completedTodo.length}</h4>
   );
};

export default TotalCompleteItems;
