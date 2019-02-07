import { INCREMENT_SOTCK, DECREMENT_SOTCK, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../constants'

const incrementStock = (id) => ({ type: INCREMENT_SOTCK, id })

const decrementStock = (id) => ({ type: DECREMENT_SOTCK, id })

const incrementAmount = (id) => ({ type: INCREMENT_AMOUNT, id })

const decrementAmount = (id) => ({ type: DECREMENT_AMOUNT, id })

export const incrementAction = (dispatch, getState) => (id) => {
  const { stock } = getState()
  if (selectIdItem(stock, id).stock > 0) {
    dispatch(decrementStock(id))
    dispatch(incrementAmount(id))
  }
}
export const decrementAction = (dispatch, getState) => (id) => {
  dispatch(incrementStock(id))
  dispatch(decrementAmount(id))
}
const selectIdItem = (stateSlice, id) => stateSlice.find(e => e.productId === id)
