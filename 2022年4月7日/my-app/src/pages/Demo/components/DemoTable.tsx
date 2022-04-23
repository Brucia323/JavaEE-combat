import {
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { DemoTableType, DemoType } from '../../../types'
import DemoService from '../../../services/demo'

const DemoTable: React.FC<DemoTableType> = ({
  selection,
  handleSelection,
  data,
  onPage,
  tableLoading,
  handleEditButton,
  handleUserDelete,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(0)

  const handlePage = (page: number) => {
    setPageNumber(page)
  }

  useEffect(() => {
    setPageNumber(1)
  }, [data])

  useEffect(() => {
    onPage()
  }, [onPage, pageNumber])

  const handleUserDeleteConfirm = async (index: number) => {
    const status = await DemoService.remove(index)
    if (status === 204) {
      handleUserDelete(index)
    } else {
      message.error('删除失败')
    }
  }

  return (
    <Table
      rowSelection={{
        selectedRowKeys: selection,
        onChange: handleSelection,
      }}
      dataSource={data}
      rowKey='id'
      pagination={{ onChange: handlePage, current: pageNumber }}
      loading={tableLoading}
    >
      <Table.Column title='ID' dataIndex='id' />
      <Table.Column title='用户名' dataIndex='username' />
      <Table.Column title='昵称' dataIndex='nickname' />
      <Table.Column title='邮箱' dataIndex='email' />
      <Table.Column title='电话' dataIndex='phone' />
      <Table.Column title='地址' dataIndex='address' />
      <Table.Column
        title='操作'
        render={(value, record: DemoType, index) => (
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditButton(record)}
            >
              编辑
            </Button>
            <Popconfirm
              title={`你确定要删除${record.username}吗？`}
              okButtonProps={{ icon: <CheckCircleOutlined /> }}
              cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
              onConfirm={() => handleUserDeleteConfirm(index)}
            >
              <Button danger icon={<UserDeleteOutlined />}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  )
}

export default DemoTable
