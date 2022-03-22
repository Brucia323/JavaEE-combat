import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import './App.css'

const App = () => {
  return (
    <>
      <Upload
        name='file'
        action='http://localhost:8080/api/file'
        onChange={info => {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
          }
        }}
      >
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    </>
  )
}

export default App
