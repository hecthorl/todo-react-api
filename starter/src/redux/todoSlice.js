import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
   'todos/getTodosAsync',
   async () => {
      const res = await fetch(`http://localhost:7000/todos`);
      if (!res.ok) return console.log('error on fetch');
      const todos = await res.json();
      return { todos };
   }
);
export const addTodosAsync = createAsyncThunk(
   'todos/addTodoAsync',
   async payload => {
      const res = await fetch(`http://localhost:7000/todos`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ title: payload.title }),
      });
      if (!res.ok) return console.log('error on fetch');
      const todo = await res.json();
      return { todo };
   }
);
export const toggleCompletedAsync = createAsyncThunk(
   'todos/completedTodosAsync',
   async payload => {
      const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ completed: payload.completed }),
      });
      if (!res.ok) return console.log('error on fetch');

      const { id, completed, title } = await res.json();
      return { id, completed, title };
   }
);
export const deleteTodoAsync = createAsyncThunk(
   'todos/deleteTodoAsync',
   async payload => {
      const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
         method: 'DELETE',
      });
      if (!res.ok) return console.log('error on fetch');

      const todos = await res.json();
      return todos;
   }
);

const todoSlice = createSlice({
   name: 'todos',
   initialState: [],
   reducers: {
      addTodo: (state, action) => {
         const newTodo = {
            id: Date.now(),
            title: action.payload.title,
            completed: false,
         };

         state.push(newTodo);
      },
      toggleCompleted: (state, action) => {
         const index = state.findIndex(todo => todo.id === action.payload.id);
         state[index].completed = action.payload.completed;
      },
      deleteTodo: (state, action) => {
         return state.filter(todo => todo.id !== action.payload.id);
      },
   },
   extraReducers: {
      [getTodosAsync.fulfilled]: (state, action) => {
         return action.payload.todos;
      },
      [addTodosAsync.fulfilled]: (state, action) => {
         // state.push(action.payload.todo);
         return [...state, action.payload.todo];
      },
      [toggleCompletedAsync.fulfilled]: (state, action) => {
         const index = state.findIndex(todo => todo.id === action.payload.id);
         state[index].completed = action.payload.completed;
      },
      [deleteTodoAsync.fulfilled]: (state, action) => {
         console.log(action.payload);
         return action.payload;
      },
   },
});

export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
