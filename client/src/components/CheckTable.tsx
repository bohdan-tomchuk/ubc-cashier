import { Table, Badge } from 'flowbite-react'
import { useGetChecksQuery } from '../store/services/cashierApi'
import { useState, useMemo } from 'react'
import { HiArrowUp, HiArrowDown } from 'react-icons/hi'
import { Check } from '../types/Check'

interface SortState {
  columnName: string,
  direction: string
}

const tableTheme = {
  head: {
    cell: {
      base: 'group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-gray-50 dark:bg-gray-700 px-2 py-3 text-center'
    }
  }
}

export default function CheckTable() {
  // const { data: checksData } = useGetChecksQuery({})
  // const [checks, setChecks] = useState<Check[]>(checksData)
  const { data: checks = [] as Check[] } = useGetChecksQuery({})
  const [sortedBy, setSortedBy] = useState<SortState>({
    columnName: '',
    direction: ''
  })
  
  const sortedChecks = useMemo(() => {
    const checksCopy = [...checks]
    if ((sortedBy.columnName === '' && sortedBy.direction === '') || (sortedBy.columnName === 'date' && sortedBy.direction === 'asc')) {
      checksCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortedBy.columnName === 'date' && sortedBy.direction === 'desc') {
      checksCopy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    return checksCopy
  }, [checks, sortedBy])

  const handleSort = () => {
    if ((sortedBy.columnName === '' && sortedBy.direction === '') || (sortedBy.columnName === 'date' && sortedBy.direction === 'asc')) {
      setSortedBy({
        columnName: 'date',
        direction: 'desc'
      })
    } else if (sortedBy.columnName === 'date' && sortedBy.direction === 'desc') {
      setSortedBy({
        columnName: 'date',
        direction: 'asc'
      })
    }
  }

  const renderSortingArrow = (columnName: string) => {
    if (sortedBy.columnName === '' && sortedBy.direction === '') return
    else if (sortedBy.columnName === columnName && sortedBy.direction === 'asc') {
      return <HiArrowUp className="inline-block ml-2" />
    } else if (sortedBy.columnName === columnName && sortedBy.direction === 'desc') {
      return <HiArrowDown className="inline-block ml-2" />
    }
  }

  return (
    <Table theme={tableTheme}>
      <Table.Head>
        <Table.HeadCell onClick={handleSort} className="cursor-pointer">
          Дата
          {sortedBy.columnName === 'date' && renderSortingArrow('date')}
        </Table.HeadCell>
        <Table.HeadCell>Сума</Table.HeadCell>
        <Table.HeadCell>Товари</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {sortedChecks?.map((check: Check) => (
          <Table.Row key={check._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-3 md:p-4">
              <div className="flex flex-col justify-center gap-2">
                <span>{new Date(check.date).toLocaleDateString('uk-UA')}</span>
                <span>{new Date(check.date).toLocaleTimeString('uk-UA')}</span>
              </div>
            </Table.Cell>
            <Table.Cell className="p-3 md:p-4 text-center ">
              <span className="font-bold text-base">{check?.products.reduce((acc, product) => acc + product.price, 0)}</span>₴
            </Table.Cell>
            <Table.Cell className="px-2 md:p-4">
              <div className="flex flex-wrap max-w-[250px]">
                {check.products.map(product => (
                  <Badge key={product._id} className="mb-2 ml-2">{product.quantity}x {product.name}</Badge>
                ))}
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}