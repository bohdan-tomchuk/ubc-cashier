export interface Product {
  _id: number
  name: string
  price: number
}

export interface CashierProduct extends Product {
  quantity: number,
  isActive: boolean
}