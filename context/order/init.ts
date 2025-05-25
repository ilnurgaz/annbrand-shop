import { sample } from 'effector'
import {
  getAnnbrandOfficesByCity,
  getAnnbrandOfficesByCityFx,
  makePayment,
  makePaymentFx,
} from '.'

sample({
  clock: getAnnbrandOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getAnnbrandOfficesByCityFx,
})

sample({
  clock: makePayment,
  source: {},
  fn: (_, data) => data,
  target: makePaymentFx,
})
