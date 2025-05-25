import { ICartItem } from './cart'

export interface IOrderTitleProps {
  orderNumber: string
  text: string
}

export interface IOrderCartItemProps {
  item: ICartItem
  position: number
}

export interface IGetAnnbrandOfficesByCityFx {
  city: string
  lang: string
}

export interface IAnnbrandAddressData {
  address_line1: string
  address_line2: string
  city: string
  place_id: string
  bbox: IAddressBBox
  lat: number
  lon: number
}

export interface ITabControlsProps {
  handleTab1: VoidFunction
  handleTab2: VoidFunction
  tab1Active: boolean
  tab2Active: boolean
  tab1Text: string
  tab2Text: string
}

export interface IAddressPosition {
  lat: number
  lon: number
}

export interface IAddressBBox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface IPickupAddressItemProps {
  addressItem: IAnnbrandAddressData
  handleSelectAddress: (arg0: IAddressBBox, arg1: IAddressPosition) => void
  handleChosenAddressData: (arg0: Partial<IAnnbrandAddressData>) => void
}

export interface IAddressesListProps {
  listClassName: string
  handleSelectAddressByMarkers?: (
    arg0: IAddressBBox,
    arg1: IAddressPosition,
    arg2?: any
  ) => void
}

export interface IMakePaymentFx {
  amount: string
  description: string
  jwt: string
  metadata?: IOrderDetailsValues
}

export interface IPaymentData {
  authorization_details: { rrn: string }
  amount: { value: string }
  description: string
  metadata?: IOrderDetailsValues
  id?: string
  status?: string
}

export interface IPaymentNotifyFx {
  email: string
  message: string
}

export interface IOrderDetailsValues {
  name_label: string
  surname_label: string
  phone_label: string
  email_label: string
  message_label: string
  isValid: boolean
  products: string
}
