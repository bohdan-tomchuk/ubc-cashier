import { Card, Button } from 'antd'
import { useState, useEffect } from 'react'
import { CashierProduct } from '../types/Product'
import { useCreateCheckMutation } from '../store/services/cashierApi'
import { HiReceiptTax, HiX } from 'react-icons/hi'
import CheckoutProductItem from './CheckoutProductItem'

type CheckoutListProps = {
  items: CashierProduct[],
  onCheckout: () => void
}

export default function CheckoutList({ items, onCheckout }: CheckoutListProps) {
  const activeItems = items?.filter((item: CashierProduct) => item.isActive)
  const [createCheck] = useCreateCheckMutation()
  // const [notifyState, setNotifyState] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1024) {
        setIsModal(true)
      } else {
        setIsModal(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCheckout = () => {
    createCheck({
      date: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      products: activeItems?.map(({ isActive, ...rest }) => { return rest } )
    })
    onCheckout()
    if (isModal) setIsModalOpen(false)
  }

  const modalStyleOpen = isModalOpen ? 'flex' : 'hidden'

  return (
    <>
      <Card className={`flex-col w-[90vw] max-w-[400px] max-h-[90vh] fixed m-auto lg:m-0 top-[50%] left-[50%] lg:top-0 lg:left-0 translate-y-[-50%] translate-x-[-50%] lg:translate-x-[0%] lg:translate-y-[0%] lg:relative z-20 lg:z-0 ${isModal ? modalStyleOpen : 'flex'}`}>
        <div onClick={() => setIsModalOpen(false)} className="lg:hidden cursor-pointer flex justify-between mb-4">
          <h3 className='text-xl font-semibold'>Розрахунок</h3>
          <HiX className="text-2xl text-black dark:text-white" />
        </div>
        <ul role="list" className="overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 ">
          {activeItems?.map((product: CashierProduct) => {
            return (
              <li key={product._id}>
                <CheckoutProductItem product={product} />
              </li>
            )
          })}
        </ul>
        <div>
          <div className="flex items-center justify-between py-4">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Загальна сума</span>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">{activeItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0)}₴</span>
          </div>
        </div>
        <Button 
          type="primary" 
          block 
          onClick={handleCheckout}
          size="large"
        >
          Підтвердити
        </Button>
      </Card>
      {isModal && (
        <div onClick={() => setIsModalOpen(false)} className={`fixed top-0 right-0 w-full h-full z-10 bg-black opacity-40 ${isModalOpen ? 'block' : 'hidden'}`}></div>
      )}
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="fixed bottom-6 right-6 h-14 lg:hidden z-50">
        <HiReceiptTax className="text-2xl" />
      </Button>
    </>
  )
}