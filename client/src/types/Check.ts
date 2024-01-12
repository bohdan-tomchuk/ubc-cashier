import { Product } from "./Product"

interface CheckItem extends Product {
    quantity: number,
}

export interface Check {
    id: number,
    date: string,
    products: CheckItem[],
}