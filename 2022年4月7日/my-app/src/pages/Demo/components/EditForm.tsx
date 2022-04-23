import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Modal, Input, Form } from 'antd'
import React, { useState } from 'react'
import { EditModal, NewDemoType } from '../../../types'

const EditForm: React.FC<EditModal> = ({
  visible,
  onEdit,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const handleOk = () => {
    setConfirmLoading(!confirmLoading)
    form
      .validateFields()
      .then((values: NewDemoType) => {
        const demo = { id: initialValues.id, ...values }
        form.resetFields()
        onEdit(demo)
      })
      .catch(info => console.log(info))
      .finally(() => setConfirmLoading(!confirmLoading))
  }

  return (
    <Modal
      visible={visible}
      title='编辑'
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ icon: <CheckCircleOutlined /> }}
      cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
      confirmLoading={confirmLoading}
    >
      <Form initialValues={initialValues}>
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

export default EditForm
