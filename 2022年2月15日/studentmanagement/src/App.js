import { Button, Card, Col, Input, InputNumber, message, Modal, Popconfirm, Row, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import { useEffect, useState } from 'react';
import './App.css';

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


    const handleName = event => {
        setName(event.target.value)
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
            sex: sex
        }
        setStudents(students.concat(newStudent))
        message.success('创建成功')
        setName('')
        setAge()
        setSex('male')
        setCreateButtonLoading(false)
    }

    const showModal = (record) => {
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
                    sex: student.sex
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
    }

    const handleSearch = () => {
        const newFilterStudents = students.filter(student => student.name.indexOf(filterName) !== -1)
        setFilterStudents(newFilterStudents)
    }

    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <Row justify='center'>
                <Col xs={24} sm={24} md={14} lg={18} xl={17} xxl={14}>
                    <Card title='简易学生管理系统'>
                        <Space direction='vertical'>
                            <Row>
                                <Col span={6}>
                                    用户名:
                                </Col>
                                <Col span={18}>
                                    <Input placeholder='输入用户名' value={name} onChange={handleName} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    年龄:
                                </Col>
                                <Col span={18}>
                                    <InputNumber value={age} onChange={handleAge} placeholder='输入年龄' min={10} precision={0} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    性别:
                                </Col>
                                <Col span={18}>
                                    <Select value={sex} onChange={handleSex}>
                                        <Select.Option value='male'>男</Select.Option>
                                        <Select.Option value='female'>女</Select.Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Button type='primary' onClick={handleCreate} loading={createButtonLoading}>创建新用户</Button>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row justify='center'>
                <Col xs={24} sm={24} md={14} lg={18} xl={17} xxl={14}>
                    <Card title='用户信息'>
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Row>
                                <Col span={5}>
                                    <Button onClick={() => {
                                        let sumAge = 0
                                        students.forEach(student => sumAge += student.age)
                                        message.info(`平均年龄是${sumAge / students.length}`)
                                    }}>显示所有学生的平均年龄</Button>
                                </Col>
                                <Col span={19}>
                                    <Input.Search placeholder='按姓名搜索' onSearch={handleSearch} value={filterName} onChange={handleFilterName} />
                                </Col>
                            </Row>
                            <Table dataSource={filterStudents}>
                                <Column title='姓名' dataIndex='name' key='name' />
                                <Column title='年龄' dataIndex='age' key='age' sorter={(a, b) => a.age - b.age} />
                                <Column title='性别' dataIndex='sex' key='sex' render={text => (
                                    text === 'male'
                                        ? <span>男</span>
                                        : <span>女</span>
                                )} />
                                <Column title='操作' key='action' render={(text, record) => (
                                    <Space>
                                        <Button onClick={() => showModal(record)}>修改</Button>
                                        <Popconfirm title='你确定要删除吗?' onConfirm={() => confirmOk(record)}>
                                            <Button>删除</Button>
                                        </Popconfirm>
                                    </Space>
                                )} />
                            </Table>
                            <Modal visible={modalVisible} onOk={modalOk} onCancel={modalCancel} title='修改' confirmLoading={okLoading}>
                                姓名:
                                <Input value={updateName} onChange={handleUpdateName} />
                            </Modal>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}

export default App;
