import ProductItem from './ProductItem'
import ProductModal from './ProductModal'
import { useEffect, useState } from 'react'
import { Card } from 'antd'
import Search from './Search'
import { useGetProductsQuery } from '../store/services/cashierApi'
import { Product } from '../types/Product'

export default function ProductsList() {
  const { data: products } = useGetProductsQuery({})
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const searchByName = (searchValue: string) => {
    if (!searchValue) setFilteredProducts(products)
    setFilteredProducts(products.filter((product: Product) => product.name.toLowerCase().includes(searchValue.toLowerCase())))
  }

  return (
    <Card className="w-full max-w-2xl max-h-[100%]">
      <div className="flex items-center justify-between pb-4">
        <div className="w-full mr-6">   
          <Search onEnter={(value) => searchByName(value)}/>
        </div>
        <ProductModal type="create" />
      </div>
      <ul role="list" className="overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
        {filteredProducts?.map((product: Product) => {
          return (
            <li key={product._id} className="py-3 sm:py-4">
              <ProductItem {...product} />
            </li>
          )
        })}
      </ul>
    </Card>
  )
}