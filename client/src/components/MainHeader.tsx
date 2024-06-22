import { Layout, Menu, Button, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { HiMiniChartPie, HiBars3, HiMiniBuildingStorefront, HiCalculator } from 'react-icons/hi2'

const { Header } = Layout

const items = [
  {
    key: 1,
    label: (
      <Link to="/" className="cursor-pointer text-neutral-900 dark:text-white text-lg">Огляд</Link>
    ),
    icon: (<HiMiniChartPie size='22px' />)
  },
  {
    key: 2,
    label: (
      <Link to="/products" className="cursor-pointer dark:text-white text-lg">Товари</Link>
    ),
    icon: (<HiMiniBuildingStorefront size='22px' />)
  },
  {
    key: 3,
    label: (
      <Link to="/cashier" className="cursor-pointer dark:text-white text-lg">Каса</Link>
    ),
    icon: (<HiCalculator size='22px' />)
  }
]

export default function MainHeader() {
  const isMobileMenu = window.matchMedia('(max-width: 768px)').matches
  
  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className="px-4 md:px-8 bg-neutral-200 dark:bg-neutral-900 z-50"
    >
      <div className="dark:text-white text-xl font-bold">Кав'ярня УБЦ</div>
      {!isMobileMenu
        ? (
          <Menu
            mode="horizontal"
            items={items}
            style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end', background: 'inherit' }}
          />
        )
        : (
          <Dropdown 
            menu={{ items }} 
            placement='bottomRight' 
            trigger={['click']}
            getPopupContainer={() => document.querySelector('header') as HTMLElement}
            overlayStyle={{
              width: 'calc(100% - 2rem)'
            }}
          >
            <Button
              type='default'
              icon={<HiBars3 size={'18px'} />}
              size='large'
              styles={{
                icon: {
                  verticalAlign: 'sub'
                }
              }}
            />
          </Dropdown>
        )
      }
    </Header>
  )
}