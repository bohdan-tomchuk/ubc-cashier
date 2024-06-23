export interface Product {
  _id: string
  name: string
  price: number
}

export interface CashierProduct extends Product {
  quantity: number,
  isActive: boolean
}