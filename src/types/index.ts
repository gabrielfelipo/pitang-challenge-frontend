export type Schedule = {
  id: string
  date: Date
  hour: Date
  citizen: Citizen
  status: string
  conclusion: string
}

export type Citizen = {
  id: string
  name: string
  birthDate: Date
}
