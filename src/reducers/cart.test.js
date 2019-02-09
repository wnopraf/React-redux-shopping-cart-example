import { INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../constants'

import amountReducer from './amount'

describe('amount reducer', () => {
  const incAction = {
    type: INCREMENT_AMOUNT,
    id: 7
  }
  const decAction = {
    type: DECREMENT_AMOUNT,
    id: 7
  }
  test('Initial cart item', () => {
    const initAmount = amountReducer(undefined, incAction)[0]
    expect(initAmount).toEqual({ productId: 7, amount: 1 })
  })
  test('Increment action', () => {
    const amountState = [{ productId: 7, amount: 4 }]
    const inAmount = amountReducer(amountState, incAction)
    expect(inAmount).toEqual([{ productId: 7, amount: 5 }])
  })
  test('Increment twice', () => {
    const amountState = [{ productId: 7, amount: 4 }]
    const inAmount = amountReducer(amountState, incAction)
    expect(inAmount).not.toEqual([{ productId: 7, amount: 6 }])
  })
  test('Decrement Action', () => {
    const amountState = [{ productId: 7, amount: 8 }]
    const decAmount = amountReducer(amountState, decAction)
    expect(decAmount).toEqual([{ productId: 7, amount: 7 }])
  })
})
