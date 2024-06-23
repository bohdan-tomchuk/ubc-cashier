import { useContext } from 'react'
import { CashierProduct } from '../types/Product'
import { CashierContext } from '../context/CashierContext'

const useProductState = (currentProduct: CashierProduct) => {
  const { productsState, setProductsState } = useContext(CashierContext)

  const handleQuantityChange = (quantity: number) => {
    const currentProductIndex = productsState.findIndex(item => item._id === currentProduct._id)
    let updatedProduct

    if (quantity === 0) {
      updatedProduct = { ...productsState[currentProductIndex], quantity, isActive: false }
    } else {
      updatedProduct = { ...productsState[currentProductIndex], quantity, isActive: true }
    }

    const newProductsState = [
      ...productsState.slice(0, currentProductIndex),
      updatedProduct,
      ...productsState.slice(currentProductIndex + 1)
    ]
    setProductsState(newProductsState)
  }

  const handleProductClick = () => {
    const currentProductIndex = productsState.findIndex(item => item._id === currentProduct._id)
    const updatedProduct = {
      ...productsState[currentProductIndex],
      isActive: !productsState[currentProductIndex].isActive,
      quantity: productsState[currentProductIndex].isActive ? 0 : 1
    }

    const newProductsState = [
      ...productsState.slice(0, currentProductIndex),
      updatedProduct,
      ...productsState.slice(currentProductIndex + 1)
    ]
    setProductsState(newProductsState)
  }

  return { handleQuantityChange, handleProductClick }
}

export default useProductState