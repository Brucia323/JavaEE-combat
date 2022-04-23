import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExportOutlined,
  ImportOutlined,
  InboxOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Input,
  Layout,
  message,
  Modal,
  PageHeader,
  Popconfirm,
  Row,
  Space,
} from 'antd'
import { Key, useEffect, useState } from 'react'
import { DemoType, NewDemoType } from '../../types'
import DemoService from '../../services/demo'
import Dragger from 'antd/lib/upload/Dragger'
import NewForm from './components/NewForm'
import EditForm from './components/EditForm'
import DemoTable from './components/DemoTable'

const Demo = () => {
  const [selection, setSelection] = useState<Key[]>([])

  const handleSelection = (keys: Key[]) => {
    setSelection(keys)
  }

  const [data, setData] = useState<DemoType[]>([])
  const [tableLoading, setTableLoading] = useState<boolean>(false)

  useEffect(() => {
    setTableLoading(true)
    DemoService.getAll()
      .then(d => setData(d))
      .catch(e => {
        message.error('数据获取失败')
        console.error(e)
      })
  }, [])

  const load = async () => {
    setTableLoading(true)
    const data = await DemoService.getAll()
    setData(data)
  }

  const clearSelection = () => {
    setSelection([])
  }

  const [filterData, setFilterData] = useState<DemoType[]>([])
  const [usernameSearch, setUsernameSearch] = useState<string>('')
  const [nicknameSearch, setNicknameSearch] = useState<string>('')
  const [emailSearch, setEmailSearch] = useState<string>('')
  const [phoneSearch, setPhoneSearch] = useState<string>('')
  const [addressSearch, setAddressSearch] = useState<string>('')

  useEffect(() => {
    setTableLoading(true)
    clearSearch()
    setFilterData(data)
    setTableLoading(false)
  }, [data])

  const clearSearch = () => {
    setUsernameSearch('')
    setNicknameSearch('')
    setEmailSearch('')
    setPhoneSearch('')
    setAddressSearch('')
  }

  const handleSearch = () => {
    setTableLoading(true)
    let objectData: DemoType[] = data
    if (usernameSearch !== '') {
      objectData = objectData.filter(
        p => p.username.search(new RegExp(usernameSearch, 'i')) !== -1
      )
    }
    if (nicknameSearch !== '') {
      objectData = objectData.filter(
        p => p.nickname.search(new RegExp(nicknameSearch, 'i')) !== -1
      )
    }
    if (emailSearch !== '') {
      objectData = objectData.filter(
        p => p.email.search(new RegExp(emailSearch, 'i')) !== -1
      )
    }
    if (phoneSearch !== '') {
      objectData = objectData.filter(
        p => p.phone.search(new RegExp(phoneSearch, 'i')) !== -1
      )
    }
    if (addressSearch !== '') {
      objectData = objectData.filter(
        p => p.address.search(new RegExp(addressSearch, 'i')) !== -1
      )
    }
    setFilterData(objectData)
    setTableLoading(false)
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
  const [editDemo, setEditDemo] = useState<DemoType>()

  const handleEditButton = (record: DemoType) => {
    setEditDemo(record)
    setEditModalVisible(true)
  }

  const handleEditOk = async (values: DemoType) => {
    const body = await DemoService.update(values.id, values)
    setData(data.map(d => (d.id === values.id ? body : d)))
    setEditModalVisible(false)
  }

  const handleEditCancel = () => {
    setEditModalVisible(false)
  }

  const handleUserDelete = (index: number) => {
    setData(data.filter(d => d.id !== index))
  }

  const handleReset = () => {
    clearSearch()
    setFilterData(data)
  }

  const [importVisible, setImportVisible] = useState(false)

  const handleImportVisible = () => {
    setImportVisible(!importVisible)
  }

  const handleExport = () => {
    window.open('http://localhost:8080/api/demo/export')
  }

  return (
    <Layout>
      <PageHeader className='background' title='查询表格' subTitle='Demo' />
      <Layout.Content>
        <Space direction='vertical' style={{ width: '100%' }}>
          <div
            className='background'
            style={{ padding: 24, margin: '24px 24px 0px' }}
          >
            <Row gutter={[24, 24]} align='middle'>
              <Col>
                用户名：
                <Input
                  style={{ width: '200px' }}
                  allowClear
                  value={usernameSearch}
                  onChange={e => setUsernameSearch(e.target.value)}
                  placeholder='请输入'
                />
              </Col>
              <Col>
                昵称：
                <Input
                  style={{ width: '200px' }}
                  allowClear
                  value={nicknameSearch}
                  onChange={e => setNicknameSearch(e.target.value)}
                  placeholder='请输入'
                />
              </Col>
              <Col>
                邮箱：
                <Input
                  style={{ width: '200px' }}
                  allowClear
                  value={emailSearch}
                  onChange={e => setEmailSearch(e.target.value)}
                  placeholder='请输入'
                />
              </Col>
              <Col>
                电话：
                <Input
                  style={{ width: '200px' }}
                  allowClear
                  value={phoneSearch}
                  onChange={e => setPhoneSearch(e.target.value)}
                  placeholder='请输入'
                />
              </Col>
              <Col>
                地址：
                <Input
                  style={{ width: '200px' }}
                  allowClear
                  value={addressSearch}
                  onChange={e => setAddressSearch(e.target.value)}
                  placeholder='请输入'
                />
              </Col>
              <Col>
                <Button icon={null} onClick={handleReset}>
                  重置
                </Button>
              </Col>
              <Col>
                <Button
                  type='primary'
                  onClick={handleSearch}
                  icon={<SearchOutlined />}
                >
                  查询
                </Button>
              </Col>
            </Row>
          </div>
          <div
            className='background'
            style={{ padding: 24, margin: '0px 24px 24px' }}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              <Space>
                <Button icon={<PlusCircleOutlined />} onClick={handleNewButton}>
                  新增
                </Button>
                <NewForm
                  visible={newModalVisible}
                  onCreate={handleNewOk}
                  onCancel={handleNewCancel}
                />
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
                <Button icon={<ImportOutlined />} onClick={handleImportVisible}>
                  导入
                </Button>
                <Modal
                  visible={importVisible}
                  title='导入'
                  footer={null}
                  onCancel={() => setImportVisible(!importVisible)}
                >
                  <Dragger
                    name='file'
                    accept='.xls,.xlsx,.csv'
                    action='http://localhost:8080/api/demo/import'
                    onChange={info => {
                      const { status } = info.file
                      if (status !== 'uploading') {
                        console.log(info.file, info.fileList)
                      }
                      if (status === 'done') {
                        message.success(`${info.file.name} 文件上传成功。`)
                        setImportVisible(!importVisible)
                        load()
                      } else if (status === 'error') {
                        message.error(`${info.file.name} 文件上传失败。`)
                      }
                    }}
                    maxCount={1}
                    showUploadList={false}
                  >
                    <p className='ant-upload-drag-icon'>
                      <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                      点击或拖动文件到此区域进行上传
                    </p>
                    <p className='ant-upload-hint'>
                      仅支持单一文件上传。支持 .xls、.xlsx、.csv
                    </p>
                  </Dragger>
                </Modal>
                <Button icon={<ExportOutlined />} onClick={handleExport}>
                  导出
                </Button>
              </Space>
              <DemoTable
                selection={selection}
                handleSelection={handleSelection}
                data={filterData}
                onPage={clearSelection}
                tableLoading={tableLoading}
                handleEditButton={handleEditButton}
                handleUserDelete={handleUserDelete}
              />
              <EditForm
                visible={editModalVisible}
                onEdit={handleEditOk}
                onCancel={handleEditCancel}
                initialValues={editDemo!}
              />
            </Space>
          </div>
        </Space>
      </Layout.Content>
    </Layout>
  )
}

export default Demo
