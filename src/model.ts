export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

//action types, que le hago al estado. Actions con su type y payload
//las creo como literal types
// type Actions =
//   | { type: "add"; payload: string }
//   | { type: "remove"; payload: number }
//   | { type: "adone"; payload: number };

// //reducer, state y actions para editar los todos
// const TodoReducer = (state: Todo[], action: Actions) => {
//   //switch case con las posibles acciones, y la logica
// };

// const [state, dispatch] = useReducer(TodoReducer, []);
