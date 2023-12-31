import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Navbar className="fixed z-10 w-full" border>
      <Navbar.Brand className="dark:text-white text-xl font-bold">Кав'ярня УБЦ</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/" className="cursor-pointer text-white">Огляд</Link>
        <Link to="/products" className="cursor-pointer text-white">Товари</Link>
        <Link to="/cashier" className="cursor-pointer text-white">Каса</Link>
      </Navbar.Collapse>
    </Navbar>
  )
}