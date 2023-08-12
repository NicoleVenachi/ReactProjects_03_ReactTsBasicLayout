import { Droppable } from "react-beautiful-dnd";

import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styes.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  competedTodos: Todo[];
  setCompetedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, competedTodos, setCompetedTodos }) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              //pao el inddes del todo, para trackear el todo movido
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos} //le mando todos para editarlos y tales
                setTodos={setTodos}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove${snapshot.isDraggingOver ? "dragacomplete" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {competedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={competedTodos} //le mando todos para editarlos y tales
                setTodos={setCompetedTodos}
              />
            ))}

            {//para que no floten en el aire, y les cree un espacio donde ponerlos
              provided.placeholder}
          </div>
        )}
      </Droppable>




    </div>
  );
};

export default TodoList;
