import { useState } from "react";

import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

import "./App.css";

import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  // estado para completed todos
  const [competedTodos, setCompetedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      //si hay un todo, lo meto en la lsita global
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };


  //logica para el drog and drap
  const onDragEnd = (result: DropResult) => {
    //saco el destino y fuente
    const { source, destination } = result;

    if (!destination) return //si lo deja en el aire, no hago nada

    if (
      (destination.droppableId == source.droppableId)
      && (destination.index == source.index)
    ) return //sino lo muevo, ni de bloque, ni de sition, nada

    let add,
      active = todos,
      complete = competedTodos;

    if (source.droppableId == 'TodosList') {
      add = active[source.index] //saco el todo correspondiente de  la lsita de todos
      active.splice(source.index, 1) //sacar solo ese elemnto
    }
    else {
      add = complete[source.index] //saco el todo correspondiente de  la lsita de completed
      complete.splice(source.index, 1) //sacar solo ese elemnto
    }

    if (destination.droppableId == 'TodosList') {

      //ahora, lo añado en el destino
      active.splice(destination.index, 0, add)
    }
    else {
      complete.splice(destination.index, 0, add)
    }

    //actualizo el estado
    setCompetedTodos(complete)
    setTodos(active)


  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify, Drop and Drag Task List</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          setCompetedTodos={setCompetedTodos}
          competedTodos={competedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
