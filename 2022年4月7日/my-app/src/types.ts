import { Key } from 'react'

export interface DemoType {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  address: string
}

export type InputStatus = 'error' | 'warning' | '' | undefined

export type NewDemoType = Omit<DemoType, 'id'>

export interface NewModal {
  visible: boolean
  onCreate: (values: NewDemoType) => void
  onCancel: () => void
}

export interface EditModal {
  visible: boolean
  onEdit: (values: DemoType) => void
  onCancel: () => void
  initialValues: DemoType
}

export interface DemoTableType {
  selection: Key[]
  handleSelection: (key: Key[]) => void
  data: DemoType[]
  onPage: () => void
  tableLoading: boolean
  handleEditButton: (record: DemoType) => void
  handleUserDelete: (index: number) => void
}
