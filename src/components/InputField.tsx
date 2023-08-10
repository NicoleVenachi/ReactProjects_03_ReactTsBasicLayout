
import { useRef } from 'react'
import './styes.css'

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

  //ref para quitar el bg-shadow al dar click
  const inputRef = useRef<HTMLInputElement>(null)


  return (
    <form className="input" onSubmit={(e)=>{
      handleAdd(e)
      inputRef.current?.blur() //shif del focus del input, se lo quita, el blur()
    }}>
      <input
        value={todo}
        onChange={
          (e)=>setTodo(e.target.value)
        }
        ref={inputRef}

        type="input" 
        placeholder='Enter a taks' 
        className='input__box'
      />

      <button className='input_submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField
