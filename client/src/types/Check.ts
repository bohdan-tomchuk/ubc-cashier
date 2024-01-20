import { Product } from "./Product"

interface CheckItem extends Product {
    quantity: number,
}

export interface Check {
    _id: number,
    date: string,
    products: CheckItem[],
}