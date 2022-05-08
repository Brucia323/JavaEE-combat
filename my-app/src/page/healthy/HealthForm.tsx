import { Form, Input, Radio, Button, message } from 'antd'
import { useState } from 'react'
import { HealthFormType, HealthFormValuesType } from '../../types'
import healthService from '../../services/health'

const HealthForm: React.FC<HealthFormType> = ({ user }) => {
  const [healthFormInitialValues] = useState({
    name: user.username,
    healthState: true,
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleHealthFinish = async (values: HealthFormValuesType) => {
    try {
      setLoading(true)
      const response = await healthService.createHealth(values)
      if (response.status === 201) {
        message.success('提交成功')
      } else if (response.status === 401) {
        message.error('请重新登录')
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
    <Form onFinish={handleHealthFinish} initialValues={healthFormInitialValues}>
      <Form.Item name='name' label='姓名'>
        <Input disabled bordered={false} />
      </Form.Item>
      <Form.Item name='healthState' label='当前健康状况'>
        <Radio.Group>
          <Radio value={true}>正常</Radio>
          <Radio value={false}>有发烧、咳嗽等症状</Radio>
        </Radio.Group>
      </Form.Item>
      <Button type='primary' htmlType='submit' loading={loading}>
        提交
      </Button>
    </Form>
  )
}

export default HealthForm
