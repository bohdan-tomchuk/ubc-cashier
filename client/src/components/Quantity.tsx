import { Button } from 'flowbite-react'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface QuantityProps {
  small?: boolean
  quantity: number,
  onQuantityChange: (quantity: number) => void
}

const defaultStyle = {
  base: 'flex items-center justify-between w-full max-w-40',
  text: 'text-white text-lg',
  button: 'w-10',
  icon: 'w-4 h-4'
}

const smallStyle = {
  base: 'flex items-center justify-between w-full max-w-28',
  text: 'text-white text-sm',
  button: 'w-7 h-7',
  icon: 'w-3 h-3'
}

export default function Quantity({ quantity, onQuantityChange, small = false }: QuantityProps) {
  const handleQuantityChange = (e: React.MouseEvent<HTMLButtonElement>, quantity: number) => {
    e.stopPropagation()
    onQuantityChange(quantity)
  }

  return (
    <div className={small ? smallStyle.base : defaultStyle.base}>
      <Button onClick={e => handleQuantityChange(e, quantity - 1)} className={small ? smallStyle.button : defaultStyle.button}>
        <FaMinus className={small ? smallStyle.icon : defaultStyle.icon} />
      </Button>
      <span className={small ? smallStyle.text : defaultStyle.text}>{quantity}</span>
      <Button onClick={e => handleQuantityChange(e, quantity + 1)} className={small ? smallStyle.button : defaultStyle.button}>
        <FaPlus className={small ? smallStyle.icon : defaultStyle.icon} />
      </Button>
    </div>
  )
}
