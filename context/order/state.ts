'use client'
import { IOrderDetailsValues, IAnnbrandAddressData } from '@/types/order'
import {
  getAnnbrandOfficesByCityFx,
  order,
  setCashPaymentTb,
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierAddressData,
  setCourierTab,
  setMapInstance,
  setOnlinePaymentTb,
  setOrderDetailsValues,
  setPickupTab,
  setShouldLoadAnnbrandData,
  setShouldShowCourierAddressData,
} from '.'

export const $annbrandDataByCity = order
  .createStore<IAnnbrandAddressData[]>([])
  .on(getAnnbrandOfficesByCityFx.done, (_, { result }) => result)

export const $pickupTab = order
  .createStore<boolean>(true)
  .on(setPickupTab, (_, value) => value)

export const $courierTab = order
  .createStore<boolean>(false)
  .on(setCourierTab, (_, value) => value)

export const $mapInstance = order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .createStore<any>({})
  .on(setMapInstance, (_, map) => map)

export const $shouldLoadAnnbrandData = order
  .createStore(false)
  .on(setShouldLoadAnnbrandData, (_, value) => value)

export const $chosenPickupAddressData = order
  .createStore<Partial<IAnnbrandAddressData>>({})
  .on(setChosenPickupAddressData, (_, value) => value)

export const $chosenCourierAddressData = order
  .createStore<Partial<IAnnbrandAddressData>>({})
  .on(setChosenCourierAddressData, (_, value) => value)

export const $shouldShowCourierAddressData = order
  .createStore(false)
  .on(setShouldShowCourierAddressData, (_, value) => value)

export const $courierAddressData = order
  .createStore<IAnnbrandAddressData>({} as IAnnbrandAddressData)
  .on(setCourierAddressData, (_, value) => value)

export const $onlinePaymentTab = order
  .createStore<boolean>(true)
  .on(setOnlinePaymentTb, (_, value) => value)

export const $cashPaymentTab = order
  .createStore<boolean>(false)
  .on(setCashPaymentTb, (_, value) => value)

export const $orderDetailsValues = order
  .createStore<IOrderDetailsValues>({} as IOrderDetailsValues)
  .on(setOrderDetailsValues, (_, value) => value)
