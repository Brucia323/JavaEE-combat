import { Button, Card, Form, Input, message, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../../services/login'
import { LoginIndexType, LoginValuesType, UserType } from '../../types'
import userService from '../../services/user'
import healthService from '../../services/health'
import vaccineService from '../../services/vaccine'
import epidemicService from '../../services/epidemic'

const Login: React.FC<LoginIndexType> = ({ setUser }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish = async (values: LoginValuesType) => {
    setLoading(true)
    try {
      const response = await loginService.login(values)
      if (response.status === 200) {
        message.success('登录成功')
        const data: UserType = response.data
        sessionStorage.setItem('user', JSON.stringify(data))
        userService.setToken(data)
        healthService.setToken(data)
        vaccineService.setToken(data)
        epidemicService.setToken(data)
        setUser(data)
        setLoading(false)
        navigate('/', { replace: true })
      } else if (response.status === 401) {
        message.error('无效的账号或密码')
      } else {
        message.warning('未知错误')
      }
      setLoading(false)
    } catch {
      message.error('网络异常')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        paddingTop: 96,
        height: '100vh',
        backgroundImage:
          'url(https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 96 }}>
        <Typography.Title>校园疫情管理系统</Typography.Title>
      </div>
      <Card style={{ width: 352, margin: '0 auto' }} title='登录'>
        <Form
          form={form}
          initialValues={{}}
          name='login'
          scrollToFirstError={true}
          onFinish={onFinish}
          size='large'
        >
          <Form.Item
            label='账号'
            name='account'
            rules={[{ required: true }, { min: 1 }, { max: 30 }]}
          >
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true }, { min: 5 }, { max: 50 }]}
          >
            <Input.Password placeholder='请输入' />
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block={true}
            size='large'
            loading={loading}
          >
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default Login
