import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusCircleOutlined,
  UserDeleteOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons'
import {
  Button,
  Input,
  Layout,
  message,
  Modal,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from 'antd'
import { Key, useEffect, useState } from 'react'
import { DemoType, InputStatus, NewDemoType } from '../types'
import DemoService from '../services/demo'

const Demo = () => {
  const [selection, setSelection] = useState<Key[]>([])

  const handleSelection = (keys: Key[]) => {
    setSelection(keys)
  }

  const [data, setData] = useState<DemoType[]>([])

  useEffect(() => {
    DemoService.getAll()
      .then(d => setData(d))
      .catch(e => {
        message.error('数据获取失败')
        console.error(e)
      })
  }, [])

  const [pageNumber, setPageNumber] = useState<number>(1)

  const handlePage = (page: number) => {
    setPageNumber(page)
    setSelection([])
  }

  const [filterData, setFilterData] = useState<DemoType[]>([])
  const [inputSearch, setInputSearch] = useState<string>('')

  useEffect(() => {
    setInputSearch('')
    setFilterData(data)
  }, [data])

  const handleSerch = (value: string) => {
    setFilterData(
      data.filter(p => p.username.search(new RegExp(value, 'i')) !== -1)
    )
  }

  const [usergroupDeleteDisabled, setUsergroupDeleteDisabled] =
    useState<boolean>(true)

  useEffect(() => {
    if (selection.length === 0) {
      setUsergroupDeleteDisabled(true)
    } else {
      setUsergroupDeleteDisabled(false)
    }
  }, [selection])

  const [username, setUsername] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const [newModalVisible, setNewModalVisible] = useState<boolean>(false)
  const [modalConfirmLoading, setModalConfirmLoading] = useState<boolean>(false)

  const handleNewButton = () => {
    setModalConfirmLoading(false)
    setNewModalVisible(true)
  }

  const [usernameInputStatus, setUsernameInputStatus] =
    useState<InputStatus>('')

  const handleNewOk = async () => {
    setModalConfirmLoading(true)
    if (username === '') {
      setUsernameInputStatus('error')
      return setModalConfirmLoading(false)
    }
    const newDemo: NewDemoType = {
      username,
      nickname,
      email,
      phone,
      address,
    }
    const body: DemoType = await DemoService.createNew(newDemo)
    setData(data.concat(body))
    setNewModalVisible(false)
    clearInput()
    setModalConfirmLoading(false)
  }

  const handleNewCancel = () => {
    setNewModalVisible(false)
    clearInput()
    setModalConfirmLoading(false)
  }

  const clearInput = () => {
    setEditId(0)
    setUsername('')
    setNickname('')
    setEmail('')
    setPhone('')
    setAddress('')
    setUsernameInputStatus('')
  }

  const handleUsergroupDeleteConfirm = () => {
    const s: number[] = [Number(...selection)]
    s.forEach(async (v: number) => {
      const status = await DemoService.remove(v)
      if (status === 204) {
        setData(data.filter(d => d.id !== v))
      } else {
        message.error(`id:${v}删除失败`)
      }
    })
    setSelection([])
  }

  const handleUsergroupDeleteCancel = () => {
    setSelection([])
  }

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editId, setEditId] = useState<number>(0)

  const handleEditButton = (record: DemoType) => {
    setEditId(record.id)
    setUsername(record.username)
    setNickname(record.nickname)
    setEmail(record.email)
    setPhone(record.phone)
    setAddress(record.address)
    setUsernameInputStatus('')
    setModalConfirmLoading(false)
    setEditModalVisible(true)
  }

  const handleEditOk = async () => {
    setModalConfirmLoading(true)
    if (username === '') {
      setUsernameInputStatus('error')
      return setModalConfirmLoading(false)
    }
    const newDemo: DemoType = {
      id: editId,
      username,
      nickname,
      email,
      phone,
      address,
    }
    const body = await DemoService.update(editId, newDemo)
    setData(data.map(d => (d.id === editId ? body : d)))
    setEditModalVisible(false)
    clearInput()
    setModalConfirmLoading(false)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
    clearInput()
  }

  const handleUserDeleteConfirm = async (index: number) => {
    const status = await DemoService.remove(index)
    if (status === 204) {
      setData(data.filter(d => d.id !== index))
    } else {
      message.error('删除失败')
    }
  }

  return (
    <Layout>
      <PageHeader
        className='site-background'
        title='查询表格'
        subTitle='Demo'
      ></PageHeader>
      <Layout.Content
        className='site-background'
        style={{ padding: 24, margin: 24 }}
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Input.Search
            style={{ width: '200px' }}
            allowClear
            onSearch={handleSerch}
            value={inputSearch}
            onChange={e => setInputSearch(e.target.value)}
          />
          <Space>
            <Button icon={<PlusCircleOutlined />} onClick={handleNewButton}>
              新增
            </Button>
            <Modal
              visible={newModalVisible}
              title='新增'
              onOk={handleNewOk}
              onCancel={handleNewCancel}
              okButtonProps={{ icon: <CheckCircleOutlined /> }}
              cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
              confirmLoading={modalConfirmLoading}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                <Input
                  addonBefore='用户名'
                  addonAfter='必填'
                  placeholder='请输入'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  allowClear
                  status={usernameInputStatus}
                />
                <Input
                  addonBefore='昵称'
                  placeholder='请输入'
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  allowClear
                />
                <Input
                  addonBefore='邮箱'
                  placeholder='请输入'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  allowClear
                />
                <Input
                  addonBefore='电话'
                  placeholder='请输入'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  allowClear
                />
                <Input
                  addonBefore='地址'
                  placeholder='请输入'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  allowClear
                />
              </Space>
            </Modal>
            <Popconfirm
              title={`你确定要删除${selection.length.toString()}位用户吗？`}
              onCancel={handleUsergroupDeleteCancel}
              onConfirm={handleUsergroupDeleteConfirm}
              okButtonProps={{ icon: <CheckCircleOutlined /> }}
              cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
              disabled={usergroupDeleteDisabled}
            >
              <Button
                danger
                icon={<UsergroupDeleteOutlined />}
                disabled={usergroupDeleteDisabled}
              >
                批量删除
              </Button>
            </Popconfirm>
            <Button icon={<ImportOutlined />} disabled>导入</Button>
            <Button icon={<ExportOutlined />} disabled>导出</Button>
          </Space>
          <Table
            rowSelection={{
              selectedRowKeys: selection,
              onChange: handleSelection,
            }}
            dataSource={filterData}
            rowKey='id'
            pagination={{ onChange: handlePage, current: pageNumber }}
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
          <Modal
            visible={editModalVisible}
            title='编辑'
            onOk={handleEditOk}
            onCancel={handleEditCancel}
            okButtonProps={{ icon: <CheckCircleOutlined /> }}
            cancelButtonProps={{ icon: <CloseCircleOutlined /> }}
            confirmLoading={modalConfirmLoading}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <Input
                addonBefore='用户名'
                addonAfter='必填'
                placeholder='请输入'
                value={username}
                onChange={e => setUsername(e.target.value)}
                allowClear
                status={usernameInputStatus}
              />
              <Input
                addonBefore='昵称'
                placeholder='请输入'
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                allowClear
              />
              <Input
                addonBefore='邮箱'
                placeholder='请输入'
                value={email}
                onChange={e => setEmail(e.target.value)}
                allowClear
              />
              <Input
                addonBefore='电话'
                placeholder='请输入'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                allowClear
              />
              <Input
                addonBefore='地址'
                placeholder='请输入'
                value={address}
                onChange={e => setAddress(e.target.value)}
                allowClear
              />
            </Space>
          </Modal>
        </Space>
      </Layout.Content>
    </Layout>
  )
}

export default Demo
