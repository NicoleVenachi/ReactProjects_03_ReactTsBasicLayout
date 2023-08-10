import React, { useEffect, useRef, useState } from 'react'

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

import { Todo } from '../model'

import './styes.css'

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}:Props) => {
  
  //estados para editar, trackeo si es editable, y estado de la edicion
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo) //por defecto tiene el texto del todo

  //
  const handleDone = (id:number) => {
    //si el id corresponde, toma la info del todo original (lo copia), y cambia su isDone
    //sino, devuelvo el todo sin vambios
    setTodos(
      todos.map(todo=> 
        todo.id===id ?
          {...todo, isDone: !todo.isDone} 
        : todo
      )
    )
  }
  const handleDelete = (id:number) => {
    setTodos( todos.filter(todo=> todo.id!==id )  )
  }
  
  const handleEdit = (e:React.FormEvent, id:number) => {
    e.preventDefault()

    //lo edita en la lista general
    setTodos(todos.map(todo=> (
        todo.id === id ?
        {...todo, todo:editTodo} 
        : todo
        )
      )
    )

    setEdit(false)
  }
  //ref para darle referencia al input, una vez lo haya clickeado
  const inputRef = useRef <HTMLInputElement> (null)

  useEffect(() =>{
    inputRef.current?.focus()
  }, [edit]) //  cuando sea editable, le pone el focus
  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>

      {
        //si es editable, muestro el input, sino el texto del todo
        edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className='todos__single--test'
          />
        )
        : ( 
          todo.isDone ? (  //sino esta hecho pone in strike tag al texto
            <s className='todos__single--text'>{todo.todo}</s>
          )
          : (
            <span className='todos__single--text'>{todo.todo}</span>
          )
        )
      }

      <div>
        <span className='icon' 
          onClick={ () => {
            // si ya esta done, para que lo edito
            if(!edit && !todo.isDone){
              setEdit(!edit) //cambio el estado del edit, ahora editable
            }

          }}
        >
          {/* empieza con Ai, es de ese tipo para importarlo */}
          <AiFillEdit/>
        </span>
        <span className='icon' onClick={()=>handleDelete(todo.id)}>
          <AiFillDelete/>
        </span>
        <span className='icon' onClick={()=>handleDone(todo.id)}>
          <MdDone/>
        </span>
      </div>
    </form>
  )
}

export default SingleTodo

