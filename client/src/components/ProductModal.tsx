import { Modal, Button, TextInput, Label } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { useEditProductMutation, useCreateProductMutation } from '../store/services/cashierApi'
import { Product } from '../types/Product'

interface ProductModalProps {
  type: 'create' | 'edit',
  product?: Product
}

export default function ProductModal({ type, product }: ProductModalProps) {
  const [createProduct] = useCreateProductMutation()
  const [editProduct] = useEditProductMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formState, setFormState] = useState<Omit<Product, '_id'>>({
    name: '',
    price: 0
  })

  useEffect(() => {
    if (product) {
      setFormState(product)
    }
  }, [product])

  const onCloseModal = () => {
    setIsModalOpen(false)
    setFormState({
      name: '',
      price: 0
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'number') {
      setFormState({
        ...formState,
        [e.target.name]: parseInt(e.target.value)
      })
      return
    }
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    if (type === 'create') {
      setFormState({
        ...formState,
      })
      createProduct(formState)
      onCloseModal()
    } else {
      editProduct(formState)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      {type === 'create' ? ( 
          <Button onClick={() => {setIsModalOpen(true)}} className="w-10">
            <FaPlus className="w-4 h-4" />
          </Button> 
        ) : ( 
          <Button onClick={() => {setIsModalOpen(true)}} className="w-10">
            <FaEdit className="w-4 h-4" />
          </Button> 
        )}
      <Modal show={isModalOpen} size="sm" onClose={onCloseModal} popup dismissible>
        <Modal.Header />
        <Modal.Body>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Назва товару" />
            </div>
            <TextInput
              id="name"
              name="name"
              placeholder="Назва товару"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Ціна" />
            </div>
            <TextInput
              id="price"
              name="price"
              placeholder="Ціна"
              type="number"
              value={formState.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button fullSized onClick={handleSubmit}>
            {
              type === 'create'
                ? 'Створити'
                : 'Редагувати'
            }
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
