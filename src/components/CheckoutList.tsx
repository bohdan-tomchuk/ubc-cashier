import { Card, Button, Toast } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { Product } from '../types/Product'
import { useAppDispatch } from '../hooks'
import { addCheck } from '../store/slices/checkSlice'
import { HiCheck, HiReceiptTax, HiX } from 'react-icons/hi'

interface ProductState extends Product {
  quantity: number,
  isActive: boolean
}

type CheckoutListProps = {
  items: Record<number, ProductState>
  onCheckout: () => void
}

const cardTheme = {
  root: {
    children: 'flex flex-col h-full py-4'
  }
}

export default function CheckoutList({ items, onCheckout }: CheckoutListProps) {
  const activeItems = Object.values(items).filter((item: ProductState) => item.isActive)
  const dispatch = useAppDispatch()
  const [notifyState, setNotifyState] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth <= 1024) setIsModal(true)
  }, [])

  const handleCheckout = () => {
    dispatch(addCheck({
      id: Date.now(),
      date: new Date().toISOString(),
      products: activeItems.map(({ isActive, ...rest }) => { return rest } )
    }))
    setNotifyState(true)
    setTimeout(() => setNotifyState(false), 4000)
    onCheckout()
    if (isModal) setIsModalOpen(false)
  }

  const modalStyleOpen = isModalOpen ? 'flex' : 'hidden'

  return (
    <>
      <Card className={`flex-col w-full max-w-[400px] lg:h-full fixed m-auto lg:m-0 left-0 right-0 lg:relative z-20 ${isModal ? modalStyleOpen : 'flex'}`} theme={cardTheme}>
        <div onClick={() => setIsModalOpen(false)} className="lg:hidden px-4 ml-auto cursor-pointer">
          <HiX className="text-2xl text-white" />
        </div>
        <ul role="list" className="overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 px-6">
          {activeItems?.map((product: ProductState) => {
            return (
              <li key={product.id} className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <p className="text-md text-gray-500 md:text-lg dark:text-gray-400">{product.name} | {product.quantity}x</p>
                  <span className="text-base font-semibold text-gray-900 dark:text-white">{product.price * product.quantity}₴</span>
                </div>
              </li>
            )
          })}
        </ul>
        <div>
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Загальна сума</span>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">{activeItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0)}₴</span>
          </div>
        </div>
        <div className="px-6">
          <Button fullSized onClick={handleCheckout}>Підтвердити</Button>
        </div>
        {notifyState && (
          <Toast className="fixed bottom-8 right-6">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <span className="ml-3 text-sm font-normal">Розрахунок успішний</span>
            <Toast.Toggle onDismiss={() => setNotifyState(false)} />
          </Toast>
        )}
      </Card>
      {isModal && (
        <div onClick={() => setIsModalOpen(false)} className={`fixed top-0 right-0 w-full h-full z-10 bg-black opacity-40 ${isModalOpen ? 'block' : 'hidden'}`}></div>
      )}
      <Button onClick={() => setIsModalOpen(true)} className="fixed bottom-6 right-6 h-14 lg:hidden">
        <HiReceiptTax className="text-2xl" />
      </Button>
    </>
  )
}