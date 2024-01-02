import { useAppSelector } from '../hooks'
import ProductItem from './ProductItem'
import ProductCreate from './ProductCreate'
import { useEffect, useState } from 'react'
import { Card } from 'flowbite-react'
import Search from './Search'

interface Product {
  id: number
  name: string
  price: number
}

export default function ProductsList() {
  const products = useAppSelector(state => state.products.list)
  const [filteredProducts, setFilteredProducts] = useState([...useAppSelector(state => state.products.list)])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const searchByName = (searchValue: string) => {
    if (!searchValue) setFilteredProducts(products)
    setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase())))
  }

  return (
    <Card className="w-full max-w-2xl">
      <div className="flex items-center justify-between pb-4 px-6">
        <div className="w-full mr-6">   
          <Search onEnter={(value) => searchByName(value)}/>
        </div>
        <ProductCreate />
      </div>
      <ul role="list" className="overflow-y-auto max-h-[70vh] divide-y divide-gray-200 dark:divide-gray-700 px-6">
        {filteredProducts.map((product: Product) => {
          return (
            <li key={product.id} className="py-3 sm:py-4">
              <ProductItem {...product} />
            </li>
          )
        })}
      </ul>
    </Card>
  )
}