import { Button, Form, Input, InputNumber, message } from 'antd'
import { useState } from 'react'
import { VaccineFormType, VaccineFormValuesType } from '../../types'
import vaccineService from '../../services/vaccine'

const VaccineForm: React.FC<VaccineFormType> = ({ user }) => {
  const [vaccineFormInitialValues] = useState({ username: user.username })
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleVaccineFinish = async (values: VaccineFormValuesType) => {
    try {
      setLoading(true)
      const response = await vaccineService.createVaccine(values)
      if (response.status === 201) {
        message.success('提交成功')
        form.resetFields()
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
    <Form
      onFinish={handleVaccineFinish}
      initialValues={vaccineFormInitialValues}
      preserve={false}
      form={form}
    >
      <Form.Item name='username' label='姓名'>
        <Input disabled bordered={false} />
      </Form.Item>
      <Form.Item name='name' label='疫苗名称' rules={[{ required: true }]}>
        <Input placeholder='请输入' />
      </Form.Item>
      <Form.Item name='needle' label='针次' rules={[{ required: true }]}>
        <InputNumber min={1} precision={0} />
      </Form.Item>
      <Button type='primary' htmlType='submit' loading={loading}>
        提交
      </Button>
    </Form>
  )
}

export default VaccineForm
