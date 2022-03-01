import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Dialog,
  Input,
  InputNumber,
  message,
  PopConfirm,
  Row,
  Select,
  Table,
} from 'tdesign-react'
import 'tdesign-react/es/style/index.css'

const App = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState()
  const [sex, setSex] = useState('male')
  const [students, setStudents] = useState([])
  const [createButtonLoading, setCreateButtonLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [updateName, setUpdateName] = useState('')
  const [updateKey, setUpdateKey] = useState()
  const [okLoading, setOkLoading] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [filterStudents, setFilterStudents] = useState([])
  useEffect(() => {
    setFilterStudents(students)
  }, [students])

  const handleName = value => {
    setName(value)
  }

  const handleAge = value => {
    setAge(value)
  }

  const handleSex = value => {
    setSex(value)
  }

  const handleCreate = () => {
    setCreateButtonLoading(true)
    if (name === '') {
      message.warning('用户名不能为空')
      setCreateButtonLoading(false)
      return
    }
    if (!age) {
      message.warning('年龄不能为空')
      setCreateButtonLoading(false)
      return
    }
    const newStudent = {
      key: students.length,
      name: name,
      age: age,
      sex: sex,
    }
    setStudents(students.concat(newStudent))
    message.success('创建成功')
    setName('')
    setAge()
    setSex('male')
    setCreateButtonLoading(false)
  }

  const showModal = record => {
    setModalVisible(true)
    setUpdateName(record.name)
    setUpdateKey(record.key)
  }

  const modalOk = () => {
    setOkLoading(true)
    if (updateName === '') {
      message.warning('姓名不能为空')
      setOkLoading(false)
      return
    }
    const newStudents = students.map(student =>
      student.key === updateKey
        ? {
            key: student.key,
            name: updateName,
            age: student.age,
            sex: student.sex,
          }
        : student
    )
    setStudents(newStudents)
    setModalVisible(false)
    setUpdateKey()
    setUpdateName('')
    setOkLoading(false)
    message.success('修改成功')
  }

  const modalCancel = () => {
    setModalVisible(false)
    setUpdateKey()
    setUpdateName('')
  }

  const handleUpdateName = event => {
    setUpdateName(event.target.value)
  }

  const confirmOk = record => {
    const newStudents = students.filter(student => student.key !== record.key)
    setStudents(newStudents)
    message.success('删除成功')
  }

  const handleFilterName = event => {
    setFilterName(event.target.value)
    const newFilterStudents = students.filter(
      student => student.name.indexOf(filterName) !== -1
    )
    setFilterStudents(newFilterStudents)
  }

  return (
    <>
      <Row justify='center'>
        <h1>简易学生管理系统</h1>
        <Row>
          <Col span={6}>用户名:</Col>
          <Col span={18}>
            <Input
              placeholder='输入用户名'
              value={name}
              onChange={handleName}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>年龄:</Col>
          <Col span={18}>
            <InputNumber
              value={age}
              onChange={handleAge}
              placeholder='输入年龄'
              min={10}
              precision={0}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>性别:</Col>
          <Col span={18}>
            <Select value={sex} onChange={handleSex}>
              <Select.Option value='male'>男</Select.Option>
              <Select.Option value='female'>女</Select.Option>
            </Select>
          </Col>
        </Row>
        <Button
          type='primary'
          onClick={handleCreate}
          loading={createButtonLoading}
        >
          创建新用户
        </Button>
      </Row>
      <Row justify='center'>
        <Col xs={24} sm={24} md={14} lg={18} xl={17} xxl={14}>
          <h2>用户信息</h2>
          <Row>
            <Col span={5}>
              <Button
                onClick={() => {
                  let sumAge = 0
                  students.forEach(student => (sumAge += student.age))
                  message.info(`平均年龄是${sumAge / students.length}`)
                }}
              >
                显示所有学生的平均年龄
              </Button>
            </Col>
            <Col span={19}>
              <Input
                placeholder='按姓名搜索'
                value={filterName}
                onChange={handleFilterName}
              />
            </Col>
          </Row>
          <Table
            data={filterStudents}
            columns={[
              {
                title: '姓名',
                colKey: 'name',
                align: 'center',
              },
              {
                title: '年龄',
                colKey: 'age',
                align: 'center',
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: '性别',
                colKey: 'sex',
                align: 'center',
                cell({ record }) {
                  switch (record) {
                    case 'male':
                      return <span>男</span>
                    case 'female':
                      return <span>女</span>
                    default:
                      return null
                  }
                },
              },
              {
                title: '操作',
                colKey: 'action',
                cell({ row }) {
                  return (
                    <>
                      <Button onClick={() => showModal(row)}>修改</Button>
                      <PopConfirm
                        title='你确定要删除吗?'
                        onConfirm={() => confirmOk(row)}
                      >
                        <Button>删除</Button>
                      </PopConfirm>
                    </>
                  )
                },
              },
            ]}
          ></Table>
          <Dialog
            visible={modalVisible}
            onOk={modalOk}
            onCancel={modalCancel}
            title='修改'
            confirmLoading={okLoading}
          >
            姓名:
            <Input value={updateName} onChange={handleUpdateName} />
          </Dialog>
        </Col>
      </Row>
    </>
  )
}

export default App
