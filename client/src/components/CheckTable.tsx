import { useGetChecksQuery } from '../store/services/cashierApi'
import { useEffect, useState } from 'react'
import { Check, CheckItem } from '../types/Check'
import { Table, type TableProps, Tag, Space, DatePicker } from 'antd'
import locale from 'antd/es/date-picker/locale/uk_UA'

const { RangePicker } = DatePicker

const columns: TableProps<Check>['columns'] = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    render: (date) => (
      <div className="flex flex-col items-center justify-center">
        <span>{new Date(date).toLocaleDateString('uk-UA')}</span>
        <span>{new Date(date).toLocaleTimeString('uk-UA')}</span>
      </div>
    )
  },
  {
    title: 'Сумма',
    key: 'total',
    render: (_, item) => (
      <p>{item.products.reduce((acc, item) => acc + (item.price * item.quantity), 0)}₴</p>
    )
  },
  {
    title: 'Товари',
    dataIndex: 'products',
    key: 'products',
    render: (products) => (
      <Space size={[0, 'small']} wrap>
        {products.map((product: CheckItem) => (
          <Tag 
            color='default' 
            key={product._id}
          >
              {product.quantity}x {product.name}
          </Tag>
        ))}
      </Space>
    )
  }
]

export default function CheckTable() {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [date, setDate] = useState<string[]>(['2024-01-01T00:00:00.000Z', '3024-01-01T23:59:59.999Z'])

  const handleDateChange = (date: string[]) => {
    // set date with time where first is 00:00:00 and last is 23:59:59
    setDate([
      date[0] + 'T00:00:00.000Z',
      date[1] + 'T23:59:59.999Z'
    ])
  }

  const { data: checks, isLoading, isFetching } = useGetChecksQuery({ page, itemsPerPage, date })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [page])

  useEffect(() => {
    console.log(date)
  }, [date])

  return (
    <Space 
      direction='vertical'
    >
      <RangePicker 
        size='large' 
        locale={locale}
        onChange={(_, values) => handleDateChange(values)}
        inputReadOnly={true}
      />
      <Table
        columns={columns}
        dataSource={checks?.results}
        size='middle'
        bordered
        loading={isLoading && isFetching}
        pagination={{
          current: page,
          pageSize: itemsPerPage,
          total: checks?.count,
          onChange: (page) => setPage(page),
          size: 'default',
          onShowSizeChange: (_, size) => setItemsPerPage(size)
        }}
        footer={() => `Загалом ${checks?.count} чеків за вибраний період`}
      />
    </Space>
  )
}