import { Table, Badge } from 'flowbite-react'
import { useAppSelector } from '../hooks'

export default function Dashboard() {
  const checks = useAppSelector(state => state.checks.list)

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Дата</Table.HeadCell>
          <Table.HeadCell>Сума</Table.HeadCell>
          <Table.HeadCell>Товари</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {checks.map(check => (
            <Table.Row key={check.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{check.id}</Table.Cell>
              <Table.Cell>
                {new Date(check.date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                {check.products.reduce((acc, product) => acc + product.price, 0)}₴
              </Table.Cell>
              <Table.Cell>
                <div className="flex flex-wrap max-w-[250px]">
                  {check.products.map(product => (
                    <Badge className="mb-2 ml-2">{product.quantity}x {product.name}</Badge>
                  ))}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}