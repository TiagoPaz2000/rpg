import Input from "./style"

const InputComponent = ({ placeholder, handleChange }) => {
  return (
    <input placeholder={placeholder} onChange={handleChange} />
  )
}

export default InputComponent