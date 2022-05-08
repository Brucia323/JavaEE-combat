import { Button, Layout, Menu, PageHeader, Typography } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { MainIndexType } from '../../types'
import Backstage from '../backstage'
import Epidemic from '../epidemic'
import Healthy from '../healthy'
import Journey from '../journey'
import Personal from '../personal'

const Main: React.FC<MainIndexType> = ({ user, setUser }) => {
  const [defaultSelectedKeys] = useState<string[]>(
    sessionStorage.getItem('defaultSelectedKeys')
      ? [sessionStorage.getItem('defaultSelectedKeys')!]
      : ['backstage']
  )
  const navigate = useNavigate()

  const handleMenuClick = ({ key }: { key: string }) => {
    sessionStorage.setItem('defaultSelectedKeys', key)
    navigate(`/${key}`, { replace: true })
  }

  const handleSignOutClick = () => {
    sessionStorage.clear()
    setUser(null!)
  }

  return (
    <Layout>
      <Layout.Sider theme='light' style={{ height: '100vh' }}>
        <Typography.Title level={4} style={{ textAlign: 'center', margin: 12 }}>
          校园疫情管理系统
        </Typography.Title>
        <Menu
          mode='inline'
          defaultSelectedKeys={defaultSelectedKeys}
          onClick={handleMenuClick}
          items={[
            {
              label: '后台首页',
              key: 'backstage',
            },
            {
              label: '个人中心',
              key: 'personal',
            },
            {
              label: '校园疫情',
              key: 'epidemic',
            },
            {
              label: '我的健康',
              key: '我的健康',
              children: [
                { label: '健康信息录入', key: 'healthy' },
                { label: '行程录入', key: 'journey' },
              ],
            },
          ]}
        />
      </Layout.Sider>
      <Layout>
        <PageHeader
          ghost={false}
          extra={
            <Button type='text' onClick={handleSignOutClick}>
              退出
            </Button>
          }
        />
        <Content
          style={{ margin: 24, padding: 24, backgroundColor: '#ffffff' }}
        >
          <Routes>
            <Route path='/personal' element={<Personal />} />
            <Route path='/epidemic' element={<Epidemic />} />
            <Route path='/healthy' element={<Healthy user={user} />} />
            <Route path='/journey' element={<Journey user={user} />} />
            <Route path='*' element={<Backstage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main
