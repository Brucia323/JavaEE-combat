import { Typography } from 'antd'
import React, { useState } from 'react'
import { UserType } from '../../types'

const Backstage: React.FC = () => {
  const [user] = useState<UserType>(
    sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!)
      : null
  )

  return (
    <>
      <Typography.Title>你好，{user.username}</Typography.Title>
    </>
  )
}

export default Backstage
