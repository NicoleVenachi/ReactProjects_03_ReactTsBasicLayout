
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styes.css'

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos}) => {
  return (
    <div className="todos">
      {
        todos.map(todo=>
          <SingleTodo todo={todo} key={todo.id}
            todos={todos} //le mando todos para editarlos y tales
            setTodos={setTodos}
          />
        )
      }
    </div>
  )
}

export default TodoList
