import { Button } from "./style";

const ButtonComponent = ({ text, handleClick }) => {
  return (
    <button type="button" onClick={ handleClick }>{text}</button>
  )
}

export default ButtonComponent