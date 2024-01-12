import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center bg-white dark:bg-gray-900 mx-auto">
        <div className="w-full max-w-screen-xl overflow-y-auto h-[100vh] px-4 pt-[80px] pb-[20px] flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </>
  )
}