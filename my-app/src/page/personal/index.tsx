import { Badge, Button, Descriptions } from 'antd'
import DescriptionsItem from 'antd/lib/descriptions/Item'
import { useEffect, useState } from 'react'
import userService from '../../services/user'
import { PersonalType } from '../../types'

const Personal: React.FC = () => {
  const [user, setUser] = useState<PersonalType>()

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem('user')!).id
    userService.getUser(id).then(value => setUser(value))
  }, [])

  return (
    <>
      <Descriptions
        title='个人信息'
        extra={<Button type='text'>修改密码</Button>}
      >
        <DescriptionsItem label='账号'>
          {user ? user.user.account : null}
        </DescriptionsItem>
        <DescriptionsItem label='姓名'>
          {user ? user.user.name : null}
        </DescriptionsItem>
        <DescriptionsItem label='健康状况'>
          {user ? (
            user.user.healthState ? (
              <Badge status='success' text='正常' />
            ) : (
              <Badge status='error' text='异常' />
            )
          ) : null}
        </DescriptionsItem>
      </Descriptions>
    </>
  )
}

export default Personal
