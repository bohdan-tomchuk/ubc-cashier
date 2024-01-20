import CheckoutList from "../components/CheckoutList"
import Search from "../components/Search"
import { useGetStatefullProductsQuery } from "../store/services/cashierApi"
import { CashierProduct } from "../types/Product"
import CashierProductItem from "../components/CashierProductItem"
import { useEffect, useState } from "react"
import { CashierContext } from "../context/CashierContext"

export default function Cashier() {
  const { data: products = [] as CashierProduct[] } = useGetStatefullProductsQuery({})
  const [productsState, setProductsState] = useState<CashierProduct[]>([])

  useEffect(() => {
    setProductsState(products)
  }, [products])

  const handleOnCheckout = () => {
    const newProductsState = productsState?.map(product => ({ ...product, quantity: 0, isActive: false }))
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
            {productsState?.map((product) => (
              <CashierProductItem 
                key={product._id}
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