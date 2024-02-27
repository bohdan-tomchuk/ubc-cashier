import { useGetChecksQuery } from '../store/services/cashierApi'
import { useState } from 'react'
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
  const [date, setDate] = useState<string[]>(['2024-01-01', '3024-01-01'])

  const handleDateChange = (date: string[]) => {
    setDate(date)
  }

  const { data: checks, isLoading } = useGetChecksQuery({ page, itemsPerPage, date })

  return (
    <Space direction='vertical'>
      <RangePicker 
        size='large' 
        locale={locale}
        onChange={(_, values) => handleDateChange(values)}
      />
      <Table
        columns={columns}
        dataSource={checks?.results}
        size='middle'
        bordered
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: itemsPerPage,
          total: checks?.count,
          onChange: setPage,
          size: 'default',
          onShowSizeChange: (_, size) => setItemsPerPage(size)
        }}
        footer={() => `Загалом ${checks?.count} чеків за вибраний період`}
      />
    </Space>
  )
}