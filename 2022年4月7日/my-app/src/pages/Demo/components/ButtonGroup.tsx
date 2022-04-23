import {
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UsergroupDeleteOutlined,
  ImportOutlined,
  InboxOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { Space, Button, Popconfirm, Modal, message } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { useState } from 'react'
import { NewDemoType, DemoType } from '../../../types'
import NewForm from './NewForm'
import DemoService from '../../../services/demo'

const ButtonGroup = ({selection}) => {
  const [newModalVisible, setNewModalVisible] = useState<boolean>(false)

  const handleNewButton = () => {
    setNewModalVisible(true)
  }

  const handleNewOk = async (values: NewDemoType) => {
    const newDemo: NewDemoType = values
    const body: DemoType = await DemoService.createNew(newDemo)
    setData(data.concat(body))
    setNewModalVisible(false)
  }

  const handleNewCancel = () => {
    setNewModalVisible(false)
  }

  return (
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
          <p className='ant-upload-text'>点击或拖动文件到此区域进行上传</p>
          <p className='ant-upload-hint'>
            仅支持单一文件上传。支持 .xls、.xlsx、.csv
          </p>
        </Dragger>
      </Modal>
      <Button icon={<ExportOutlined />} onClick={handleExport}>
        导出
      </Button>
    </Space>
  )
}

export default ButtonGroup
