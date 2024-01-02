import { Product } from '../types/Product'
import { Button } from 'flowbite-react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { memo } from 'react'

type CashierProductItemProps = {
  product: Product,
  isActive: boolean,
  quantity: number,
  onQuantityChange: (id: number, quantity: number) => void,
  onProductClick: (id: number) => void
}

export default memo(function CashierProductItem({ product, isActive, quantity, onProductClick, onQuantityChange }: CashierProductItemProps) {

  const handleQuantityChange = (e, quantity) => {
    e.stopPropagation()
    onQuantityChange(product.id, quantity)
  }

  return (
    <div onClick={() => onProductClick(product.id)} className={`flex sm:flex-col items-center justify-between w-full sm:h-40 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 cursor-pointer ${ isActive ? 'outline outline-2 outline-cyan-600' : '' }`}>
      <div className="flex flex-col sm:items-center justify-between sm:h-full mr-8 sm:mr-0">
        <p className="text-md mb-4 sm:mb-0 text-gray-500 md:text-lg dark:text-gray-400">{product.name}</p>
        <span className="text-base font-semibold text-gray-900 dark:text-white">{product.price}₴</span>
      </div>
      {isActive && (
        <div className="w-full flex items-center justify-between max-w-40">
          <Button onClick={e => handleQuantityChange(e, quantity - 1)} className="w-10">
            <FaMinus className="w-4 h-4" />
          </Button>
          <span className="mx-2 text-white text-lg">{quantity}</span>
          <Button onClick={e => handleQuantityChange(e, quantity + 1)} className="w-10">
            <FaPlus className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
})