import { useRemoveProductMutation } from "../store/services/cashierApi"
import { FaRegTrashAlt } from "react-icons/fa"
import { Button } from 'antd'
import { Product } from '../types/Product'
import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import ProductModal from './ProductModal'

type ProductItemProps = Product

export default function ProductItem({ _id, name, price }: ProductItemProps) {
  const [ removeProduct ] = useRemoveProductMutation()
  const [openModal, setOpenModal] = useState(false)

  const handleRemove = () => {
    setOpenModal(false)
    removeProduct(_id)
  }
  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col justify-between items-start mr-auto">
          <p className="text-md text-gray-500 md:text-lg dark:text-gray-400">
            {name}
          </p>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            {price}₴
          </span>
        </div>
        <ProductModal type="edit" product={{_id, name, price}} />
        <Button 
          onClick={() => {setOpenModal(true)}} 
          type="primary"
          danger
          size="large"
          className='ml-3 flex justify-center items-center'
          icon={<FaRegTrashAlt className="w-4 h-4" />}
        />
      </div>
      <ConfirmDialog 
        isOpen={openModal}
        onClose={() => {setOpenModal(false)}}
        onConfirm={handleRemove}
        onCancel={() => {setOpenModal(false)}}
        confirmType="remove"
      />
    </>
  )
}
