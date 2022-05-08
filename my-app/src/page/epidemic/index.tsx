import { Line } from '@ant-design/charts'
import { Card, Spin } from 'antd'
import { useEffect, useState } from 'react'
import epidemicService from '../../services/epidemic'

const Epidemic = () => {
  const [data, setData] = useState<Record<string, any>[]>()

  useEffect(() => {
    epidemicService.getEpidemic().then(value => setData(value))
  }, [])
  
  if (!data) {
    return <Spin />
  }

  return (
    <Card title='健康状况上报人数'>
      <Line data={data} xField='date' yField='count' seriesField='healthState' />
    </Card>
  )
}

export default Epidemic
