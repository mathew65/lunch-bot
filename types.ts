export type Restaurant = {
  id: string,
  name: string,
  menu: Array<MenuItem>,
}
export type MenuItem = {
  jidlo: string,
  cena: string
}

export type Search = {
  type: SeachType,
  value: string
}

export enum SeachType {
  menu,
  restaurant
}