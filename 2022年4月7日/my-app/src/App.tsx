import { Layout, Menu } from 'antd'
import './App.css'
import { GithubOutlined } from '@ant-design/icons'
import { Route, Routes } from 'react-router-dom'
import Demo from './components/Demo'

const App = () => {
  return (
    <Layout>
      <Layout.Sider
        className='site-background'
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'auto',
          zIndex: 999,
        }}
      >
        <div style={{ height: 48 }} />
        <Menu mode='inline' defaultSelectedKeys={['1']} selectedKeys={['1']}>
          <Menu.Item key='1'>查询表格</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          className='site-background'
          style={{
            height: 48,
            position: 'sticky',
            top: 0,
            zIndex: 99,
          }}
        />
        <Routes>
          <Route path='/' element={<Demo />} />
        </Routes>
        <Layout.Footer style={{ textAlign: 'center' }}>
            <GithubOutlined /> ZZZCNY
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default App
