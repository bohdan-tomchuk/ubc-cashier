import { CashierProduct } from '../types/Product'
import Quantity from './Quantity'
import { memo } from 'react'
import useProductState from '../hooks/useProductState'

export default memo(function CheckoutProductItem({ product }: { product: CashierProduct }) {
  const { handleQuantityChange } = useProductState(product)

  return (
    <div className="flex items-center justify-between py-4 sm:py-4">
      <p className="text-md text-gray-500 md:text-lg dark:text-gray-400">{product.name}</p>
      <Quantity 
        quantity={product.quantity} 
        small
        onQuantityChange={q => handleQuantityChange(q)}
      />
      <span className="text-base font-semibold text-gray-900 dark:text-white">{product.price * product.quantity}₴</span>
    </div>
  )
})