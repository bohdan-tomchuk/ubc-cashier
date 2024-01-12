import { CashierProduct } from '../types/Product'
import { memo } from 'react'
import Quantity from './Quantity'
import useProductState from '../hooks/ProductState'

type CashierProductItemProps = {
  product: CashierProduct,
}

export default memo(function CashierProductItem({ product }: CashierProductItemProps) {
  const { handleQuantityChange, handleProductClick } = useProductState(product)

  return (
    <div onClick={handleProductClick} className={`flex sm:flex-col items-center justify-between w-full sm:h-40 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 md:p-6 cursor-pointer ${ product.isActive ? 'outline outline-2 outline-cyan-600' : '' }`}>
      <div className="flex flex-col sm:items-center justify-between sm:h-full mr-8 sm:mr-0">
        <p className="text-md mb-4 sm:mb-0 text-gray-500 md:text-lg dark:text-gray-400">{product.name}</p>
        <span className="text-base font-semibold text-gray-900 dark:text-white">{product.price}₴</span>
      </div>
      {product.isActive && (
        <Quantity 
          quantity={product.quantity} 
          onQuantityChange={q => handleQuantityChange(q)} 
        />
      )}
    </div>
  )
})