import { Button, DatePicker, Form, Input, message } from 'antd'
import { useState } from 'react'
import { JourneyFormValuesType, JourneyIndexType } from '../../types'
import journeyService from '../../services/journey'

const Journey: React.FC<JourneyIndexType> = ({ user }) => {
  const [journeyFormInitialValues] = useState({
    name: user.username,
    more: '',
  })
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleFinish = async (values: JourneyFormValuesType) => {
    try {
      setLoading(true)
      values = { ...values, startTime: values.time[0], endTime: values.time[1] }
      const response = await journeyService.createJourney(values)
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
      onFinish={handleFinish}
      initialValues={journeyFormInitialValues}
      form={form}
    >
      <Form.Item name='name' label='姓名'>
        <Input disabled bordered={false} />
      </Form.Item>
      <Form.Item name='location' label='地点' rules={[{ required: true }]}>
        <Input placeholder='请输入' />
      </Form.Item>
      <Form.Item name='time' label='时间' rules={[{ required: true }]}>
        <DatePicker.RangePicker
          showTime
          placeholder={['请选择', '请选择']}
          format='YYYY-MM-DD HH:mm'
        />
      </Form.Item>
      <Form.Item name='more' label='备注'>
        <Input.TextArea placeholder='请输入' />
      </Form.Item>
      <Button type='primary' htmlType='submit' loading={loading}>
        提交
      </Button>
    </Form>
  )
}

export default Journey
