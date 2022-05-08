export interface LoginValuesType {
  id: number
  password: string
}

export interface UserType {
  token: string
  id: number
  username: string
}

export interface LoginIndexType {
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

export interface PersonalType {
  health: []
  journey: []
  user: {
    id: number
    account: string
    name: string
    healthState: boolean
  }
  vaccine: []
}

export interface MainIndexType {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

export interface HealthIndexType {
  user: UserType
}

export type HealthFormType = HealthIndexType

export type VaccineFormType = HealthIndexType

export interface JourneyIndexType {
  user: UserType
}

export interface HealthFormValuesType {
  name: string
  healthState: boolean
}

export interface VaccineFormValuesType {
  username: string
}

export interface JourneyFormValuesType {
  name: string
  location: string
  more: string
  time: string[]
  startTime: string
  endTime: string
}
