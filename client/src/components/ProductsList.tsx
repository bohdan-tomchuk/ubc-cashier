import ProductItem from './ProductItem'
import ProductModal from './ProductModal'
import { useEffect, useState } from 'react'
import { Card } from 'flowbite-react'
import Search from './Search'
import { useGetProductsQuery } from '../store/services/cashierApi'
import { Product } from '../types/Product'

const cardTheme = {
  root: {
    children: 'flex flex-col h-full py-4 px-2 md:p-6'
  }
}

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
    <Card className="w-full max-w-2xl max-h-[100%]" theme={cardTheme}>
      <div className="flex items-center justify-between pb-4 px-4">
        <div className="w-full mr-6">   
          <Search onEnter={(value) => searchByName(value)}/>
        </div>
        <ProductModal type="create" />
      </div>
      <ul role="list" className="overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 px-6">
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