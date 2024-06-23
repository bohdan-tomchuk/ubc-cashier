import { createContext, type Dispatch, type SetStateAction } from 'react'
import { CashierProduct } from '../types/Product'


export interface CashierContextType {
  productsState: CashierProduct[],
  setProductsState: Dispatch<SetStateAction<CashierProduct[]>>
}

export const CashierContext = createContext<CashierContextType>({
  productsState: [],
  setProductsState: () => {}
})
