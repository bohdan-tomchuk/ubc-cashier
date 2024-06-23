import { Button } from "antd"
import { FiCheck, FiMove } from "react-icons/fi"
import { useState } from "react"

interface Props {
  onSave: () => void,
  onToggle: (arg0: boolean) => void
}

const activeStyle = {
  color: 'green',
  borderColor: 'green',
}

export default function DnDToggler({ onSave, onToggle }: Props) {
  const [isActive, setActive] = useState(false)
  const [icon, setIcon] = useState(<FiMove />)

  const handleToggle = () => {
    if (isActive) {
      onSave()
      setIcon(<FiMove />)
    } else {
      setIcon(<FiCheck />)
    }
    onToggle(!isActive)
    setActive(!isActive)
  }

  return (
    <Button
      size={"large"}
      className="ml-3 flex justify-center items-center"
      icon={icon}
      onClick={handleToggle}
      style={ isActive ? activeStyle : {} }
    />
  );
}
