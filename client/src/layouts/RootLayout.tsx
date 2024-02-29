import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import MainHeader from '../components/MainHeader'

export default function RootLayout() {
  return (
    <Layout>
      <MainHeader/>
      <main className='py-4 px-4 md:px-8 flex justify-center' style={{minHeight: 'calc(100vh - 64px)'}}>
        <Outlet />
      </main>
    </Layout>
  )
}