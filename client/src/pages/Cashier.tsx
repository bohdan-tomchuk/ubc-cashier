import CheckoutList from "../components/CheckoutList"
import Search from "../components/Search"
import { useAppSelector } from "../hooks"
import { Product } from "../types/Product"
import CashierProductItem from "../components/CashierProductItem"
import { useState } from "react"

interface ProductState extends Product {
  quantity: number,
  isActive: boolean
}

export default function Cashier() {
  const products = useAppSelector(state => state.products.list)
  const [productsState, setProductsState] = useState<Record<number, ProductState>>(() => {
    const initialStates: Record<number, ProductState> = {}
    for (const product of products) {
      initialStates[product.id] = { ...product, quantity: 0, isActive: false }
    }
    return initialStates
  })

  const handleQuantityChange = (id: number, quantity: number) => {
    const newProductsState = { ...productsState, [id]: { ...productsState[id], quantity } }
    if (quantity === 0) newProductsState[id].isActive = false
    setProductsState(newProductsState)
  }

  const handleProductClick = (id: number) => {
    const newProductsState = { 
      ...productsState, 
      [id]: { 
        ...productsState[id], 
        isActive: !productsState[id].isActive,
        quantity: productsState[id].isActive ? 0 : 1
      } 
    }
    setProductsState(newProductsState)
  }

  const handleCheckout = () => {
    const newProductsState: Record<number, ProductState> = {}
    for (const product of products) {
      newProductsState[product.id] = { ...product, quantity: 0, isActive: false }
    }
    setProductsState(newProductsState)
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col w-full lg:mr-16">
        <Search className="max-w-md mb-6"/>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-6">
          {Object.values(productsState).map((product) => (
            <CashierProductItem 
              key={product.id}
              product={product}
              isActive={product.isActive}
              quantity={product.quantity}
              onQuantityChange={handleQuantityChange}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>
      <CheckoutList items={productsState} onCheckout={handleCheckout}/>
    </div>
  )
}