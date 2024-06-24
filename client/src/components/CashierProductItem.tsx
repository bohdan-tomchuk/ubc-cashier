import { CashierProduct } from '../types/Product'
import { memo, useEffect, useState } from 'react'
import Quantity from './Quantity'
import useProductState from '../hooks/useProductState'
import { Card } from 'antd'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  product: CashierProduct,
  isDnDMode: boolean
}

const defaultCardBodyStyle = {
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)',
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

export default memo(function CashierProductItem({ product, isDnDMode }: Props) {
  const { 
    attributes, 
    listeners, 
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: product._id,
  })
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.8 : 1,
  }

  const defaultAttrs = {
    onClick: handleProductClick,
  }

  const DnDModeAttrs = {
    ...attributes,
    ...listeners
  }

  return (
    <Card 
      // onClick={handleProductClick} 
      className={`w-full cursor-pointer ${ product.isActive ? 'outline outline-2 outline-blue-600' : '' } ${ isDnDMode ? 'touch-none' : ''}`}
      styles={{
        body: isMobileCard ? mobileCardBodyStyle : defaultCardBodyStyle,
      }}
      style={style}
      ref={setNodeRef}
      {...(isDnDMode ? DnDModeAttrs : defaultAttrs)}
    >
      <div className={`flex flex-col sm:items-center justify-between ${ !product.isActive ? 'sm:h-full' : 'flex-1' } ${ (!isMobileCard && product.isActive) && 'mb-2' } mr-8 sm:mr-0`}>
        <p className="text-md mb-4 sm:mb-0 text-gray-500 md:text-lg dark:text-gray-400">{product.name}</p>
        <span onClick={handleProductClick} className="text-base font-semibold text-gray-900 dark:text-white">{product.price}₴</span>
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