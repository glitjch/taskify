import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete, } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,

}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ editTodo, setEditTodo] = useState<string>(todo.todo)
  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus();
  
  }, [editMode])
  
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, isDone: !todo.isDone} : todo // remember, !todo.isDone is shorthand for returning the opposite
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    )
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (
      todo.id === id ? {...todo, todo:editTodo} : todo
    )));
    setEditMode(false);
  }

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>

      {editMode ? (
        <input 
          ref={inputRef}
          type="text"
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
        ) : (
        todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
          ) : (  
          <span className="todos__single--text">{todo.todo}</span>
        )
      )
      }
      <div>
        <span className="icon" onClick={ () => {
          if (!editMode && !todo.isDone) {
            setEditMode(!editMode)
          }
          if (editMode) {

          }
        }
        }><AiFillEdit /></span>
        <span className="icon" onClick={() => handleDelete(todo.id)} ><AiFillDelete /></span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>

    </form>
  )
}

export default SingleTodo

// personal notes:
/*
. todo.todo is a props passed down from model.ts. one of its attributes is the 'todo'  the description of the task.
. this task single is created as a form, because it has the option to be edited on the spot. 
*/