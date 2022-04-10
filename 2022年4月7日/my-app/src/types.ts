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
