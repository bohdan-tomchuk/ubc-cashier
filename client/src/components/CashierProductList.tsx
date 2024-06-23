import { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'

interface Props {
  children: ReactNode,
  isDragging: boolean
}

const stripedBgStyle = {
  background: "repeating-linear-gradient(45deg, #1668dcb3, #1668dcb3 20px, transparent 20px, transparent 40px)",
  transform: 'scale(1.01, 1.01)',
}

export default function CashierProductList({ children, isDragging }: Props) {
  const { setNodeRef } = useDroppable({
    id: 'cashierProducts',
  })

  return (
    <div className="relative">
      <div 
        className="relative grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-4 md:gap-6 z-10"
        ref={setNodeRef}
      >
        {children}
      </div>
      {isDragging && 
        <div 
          style={stripedBgStyle}
          className="absolute top-0 left-0 w-full h-full outline-dashed outline-blue-600 outline-offset-8 rounded opacity-50 z-0"
        />
      }
    </div>
  )
}