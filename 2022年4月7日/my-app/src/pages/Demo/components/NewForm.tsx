import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Modal, Form, Input } from 'antd'
import React, { useState } from 'react'
import { NewModal } from '../../../types'

const NewForm: React.FC<NewModal> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const handleOk = () => {
    setConfirmLoading(!confirmLoading)
    form
      .validateFields()
      .then(values => {
        form.resetFields()
        onCreate(values)
      })
      .catch(info => console.log(info))
      .finally(() => setConfirmLoading(!confirmLoading))
  }

  return (
    <Modal
      visible={visible}
      title='新增'
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ icon: <CheckCircleOutlined /> }}
      cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
      confirmLoading={confirmLoading}
    >
      <Form>
        <Form.Item name='username' label='用户名' required>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='nickname' label='昵称' required>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='email' label='邮箱'>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='phone' label='电话'>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
        <Form.Item name='address' label='地址'>
          <Input placeholder='请输入' allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NewForm
