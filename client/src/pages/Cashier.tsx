import CheckoutList from "../components/CheckoutList"
import Search from "../components/Search"
import { useGetStatefullProductsQuery } from "../store/services/cashierApi"
import { CashierProduct } from "../types/Product"
import CashierProductItem from "../components/CashierProductItem"
import { useEffect, useState } from "react"
import { CashierContext } from "../context/CashierContext"
import { 
  DndContext,
  DragOverlay,
  useSensors, 
  useSensor,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext, 
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable"
import CashierProductList from "../components/CashierProductList"
import DnDToggler from "../components/DnDToggler"

export default function Cashier() {
  const { data: products = [] as CashierProduct[] } = useGetStatefullProductsQuery({})
  const [productsState, setProductsState] = useState<CashierProduct[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const sortProductState = () => {
    const result: CashierProduct[] = []
    const ids = JSON.parse(localStorage.getItem('productsOrder')!)

    products.forEach((product) => {
      result[ids.indexOf(product._id)] = product
    })

    return result
  }

  useEffect(() => {
    if (localStorage.getItem('productsOrder') !== null) {
      setProductsState(sortProductState())
    } else {
      setProductsState(products)
    }
  }, [products])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    setDraggingId(event.active.id)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const {active, over} = event

    if (active.id !== over.id) {
      setProductsState((prev) => {
        const activeIndex = prev.findIndex((item) => item._id === active.id)
        const overIndex = prev.findIndex((item) => item._id === over.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }

    setDraggingId(null)
  }

  const handleOnCheckout = () => {
    const newProductsState = productsState?.map(product => ({ ...product, quantity: 0, isActive: false }))
    setProductsState(newProductsState)
  }

  const handleSearch = () => {
    console.log('search')
  }

  const getProductsIDs = () => {
    return productsState.map(product => product._id)
  }

  const getProductById = (id: string): CashierProduct => {
    return productsState.find(product => product._id === id)!
  }

  const saveProductsOrder = () => {
    localStorage.setItem('productsOrder', JSON.stringify(getProductsIDs()))
  }

  return (
    <CashierContext.Provider value={{ productsState, setProductsState }}>
      <div className="flex items-start justify-between w-full ">
        <div className="flex flex-col w-full lg:mr-16">
          <div className="flex mb-6 justify-between">
            <Search onEnter={handleSearch} className="max-w-md w-full"/>
            <DnDToggler 
              onToggle={(value) => setIsDragging(value)}
              onSave={saveProductsOrder}
            />
          </div>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <CashierProductList isDragging={isDragging}>
              <SortableContext id="_id" items={getProductsIDs()} strategy={rectSortingStrategy}>
                {productsState?.map((product) => (
                  <CashierProductItem
                    isDnDMode={isDragging}
                    key={product._id}
                    product={product}
                  />  
                ))}
              </SortableContext>
              <DragOverlay>
                {draggingId ? <CashierProductItem product={getProductById(draggingId)} isDnDMode={true} /> : null}
              </DragOverlay>
            </CashierProductList>
          </DndContext>
        </div>
        <CheckoutList items={productsState} onCheckout={handleOnCheckout}/>
      </div>
    </CashierContext.Provider>
  )
}