import { Card, Button, Toast } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { CashierProduct } from '../types/Product'
import { useAppDispatch } from '../hooks'
import { addCheck } from '../store/slices/checkSlice'
import { HiCheck, HiReceiptTax, HiX } from 'react-icons/hi'
import CheckoutProductItem from './CheckoutProductItem'

type CheckoutListProps = {
  items: CashierProduct[],
  onCheckout: () => void
}

const cardTheme = {
  root: {
    children: 'flex flex-col py-4'
  }
}

export default function CheckoutList({ items, onCheckout }: CheckoutListProps) {
  const activeItems = items.filter((item: CashierProduct) => item.isActive)
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Card className={`flex-col w-[90vw] max-w-[400px] max-h-[90vh] fixed m-auto lg:m-0 top-[50%] left-[50%] lg:top-0 lg:left-0 translate-y-[-50%] translate-x-[-50%] lg:translate-x-[0%] lg:translate-y-[0%] lg:relative z-20 ${isModal ? modalStyleOpen : 'flex'}`} theme={cardTheme}>
        <div onClick={() => setIsModalOpen(false)} className="lg:hidden px-4 ml-auto cursor-pointer">
          <HiX className="text-2xl text-white" />
        </div>
        <ul role="list" className="overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 px-6 ">
          {activeItems?.map((product: CashierProduct) => {
            return (
              <li key={product.id}>
                <CheckoutProductItem product={product} />
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