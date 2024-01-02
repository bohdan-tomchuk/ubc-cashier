import { removeProduct } from '../store/slices/productSlice'
import { useAppDispatch } from '../hooks'
import { FaRegTrashAlt } from "react-icons/fa"
import { Button } from 'flowbite-react'
import { Product } from '../types/Product'

type ProductItemProps = Product

export default function ProductItem({ id, name, price }: ProductItemProps) {
  const dispatch = useAppDispatch()

  const handleRemove = () => dispatch(removeProduct(id))
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col justify-between items-start">
        <p className="text-md text-gray-500 md:text-lg dark:text-gray-400">
          {name}
        </p>
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          {price}₴
        </span>
      </div>
      <Button onClick={handleRemove} outline color="failure">
        <FaRegTrashAlt className="w-4 h-4" />
      </Button>
    </div>
  );
}
