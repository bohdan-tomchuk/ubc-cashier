import { Modal, Button, TextInput, Label } from 'flowbite-react'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useAppDispatch } from '../hooks'
import { addProduct } from '../store/slices/productSlice'
import { Product } from '../types/Product'

export default function ProductCreate() {
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formState, setFormState] = useState<Product>({
    id: 0,
    name: '',
    price: 0
  })

  const onCloseModal = () => {
    setIsModalOpen(false)
    setFormState({
      id: 0,
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
    setFormState({
      ...formState,
      id: Date.now()
    })
    dispatch(addProduct(formState))
    onCloseModal()
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} type="button" color="blue">
        <FaPlus className="text-xl" />
      </Button>
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
              placeholder="каКАо какаО"
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
          <Button fullSized onClick={handleSubmit}>Створити</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
