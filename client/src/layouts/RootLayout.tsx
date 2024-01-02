import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center bg-white dark:bg-gray-900 mx-auto">
        <div className="w-full max-w-screen-xl px-4 pt-[40px] flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </>
  )
}