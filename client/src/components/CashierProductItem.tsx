import { CashierProduct } from '../types/Product'
import { memo, useEffect, useState } from 'react'
import Quantity from './Quantity'
import useProductState from '../hooks/useProductState'
import { Card } from 'antd'

type CashierProductItemProps = {
  product: CashierProduct,
}

const defaultCardBodyStyle = {
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const mobileCardBodyStyle = {
  height: '100px',
  display: 'flex',
  alignItems: 'center'
}

export default memo(function CashierProductItem({ product }: CashierProductItemProps) {
  const [isMobileCard, setIsMobileCard] = useState<boolean>(false)
  const { handleQuantityChange, handleProductClick } = useProductState(product)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setIsMobileCard(true)
      } else {
        setIsMobileCard(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Card 
      onClick={handleProductClick} 
      className={`w-full cursor-pointer ${ product.isActive ? 'outline outline-2 outline-blue-600' : '' }`}
      styles={{
        body: isMobileCard ? mobileCardBodyStyle : defaultCardBodyStyle
      }}
    >
      <div className={`flex flex-col sm:items-center justify-between ${ !product.isActive ? 'sm:h-full' : 'flex-1' } ${ (!isMobileCard && product.isActive) && 'mb-2' } mr-8 sm:mr-0`}>
        <p className="text-md mb-4 sm:mb-0 text-gray-500 md:text-lg dark:text-gray-400">{product.name}</p>
        <span className="text-base font-semibold text-gray-900 dark:text-white">{product.price}₴</span>
      </div>
      {product.isActive && (
        <Quantity 
          quantity={product.quantity} 
          onQuantityChange={q => handleQuantityChange(q)} 
        />
      )}
    </Card>
  )
})