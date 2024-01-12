import CheckoutList from "../components/CheckoutList"
import Search from "../components/Search"
import { useAppSelector } from "../hooks"
import { CashierProduct } from "../types/Product"
import CashierProductItem from "../components/CashierProductItem"
import { useState } from "react"
import { CashierContext } from "../context/CashierContext"

export default function Cashier() {
  const products = useAppSelector(state => state.products.list)
  const [productsState, setProductsState] = useState<CashierProduct[]>(() => {
    return products.map(product => ({ ...product, quantity: 0, isActive: false }))
  })

  const handleOnCheckout = () => {
    const newProductsState = productsState.map(product => ({ ...product, quantity: 0, isActive: false }))
    setProductsState(newProductsState)
  }

  const handleSearch = () => {
    console.log('search')
  }

  return (
    <CashierContext.Provider value={{ productsState, setProductsState }}>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col w-full lg:mr-16">
          <Search onEnter={handleSearch} className="max-w-md mb-6"/>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-4 md:gap-6">
            {productsState.map((product) => (
              <CashierProductItem 
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
        <CheckoutList items={productsState} onCheckout={handleOnCheckout}/>
      </div>
    </CashierContext.Provider>
  )
}