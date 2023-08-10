
import { useState } from 'react'
import './styes.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: () => void
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {



  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        value={todo}
        onChange={
          (e)=>setTodo(e.target.value)
        }

        type="input" 
        placeholder='Enter a taks' 
        className='input__box'
      />

      <button className='input_submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField
