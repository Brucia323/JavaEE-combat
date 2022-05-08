import { Tabs } from 'antd'
import React from 'react'
import { HealthIndexType } from '../../types'
import HealthForm from './HealthForm'
import VaccineForm from './VaccineForm'

const Healthy: React.FC<HealthIndexType> = ({ user }) => {
  return (
    <Tabs defaultActiveKey='1'>
      <Tabs.TabPane tab='健康信息' key='1'>
        <HealthForm user={user} />
      </Tabs.TabPane>
      <Tabs.TabPane tab='新冠疫苗接种记录' key='2'>
        <VaccineForm user={user} />
      </Tabs.TabPane>
    </Tabs>
  )
}

export default Healthy
