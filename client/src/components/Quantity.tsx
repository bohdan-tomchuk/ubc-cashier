import { Button } from 'antd'
import { FaPlus, FaMinus } from 'react-icons/fa'

interface QuantityProps {
  small?: boolean
  quantity: number,
  onQuantityChange: (quantity: number) => void
}

const defaultStyle = {
  base: 'flex items-center justify-between w-full max-w-40',
  text: 'text-black dark:text-white text-lg',
}

const smallStyle = {
  base: 'flex items-center justify-between w-full max-w-28',
  text: 'text-black dark:text-white text-sm',
}

export default function Quantity({ quantity, onQuantityChange, small = false }: QuantityProps) {
  const handleQuantityChange = (e: React.MouseEvent<HTMLElement>, quantity: number) => {
    e.stopPropagation()
    onQuantityChange(quantity)
  }

  return (
    <div className={small ? smallStyle.base : defaultStyle.base}>
      <Button
        type="primary"
        onClick={e => handleQuantityChange(e, quantity - 1)}
        size={small ? 'small' : 'middle'}
        icon={<FaMinus size={small ? '12px' : '16px'} />}
        className="flex items-center justify-center"
      />
      <span className={small ? smallStyle.text : defaultStyle.text}>{quantity}</span>
      <Button
        type="primary"
        onClick={e => handleQuantityChange(e, quantity + 1)}
        size={small ? 'small' : 'middle'}
        icon={<FaPlus size={small ? '12px' : '16px'} />}
        className="flex items-center justify-center"
      />
    </div>
  )
}
