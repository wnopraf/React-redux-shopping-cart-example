import { ADD_PRODUCT, DELETE_PRODUCT, INCREMENT_SOTCK, DECREMENT_SOTCK, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../constants'

export const AddProduct = (id) => {
  return {
    type: ADD_PRODUCT,
    id
  }
}

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

const incrementStock = (id) => ({ type: INCREMENT_SOTCK, id })

const decrementStock = (id) => ({ type: DECREMENT_SOTCK, id })

const incrementAmount = (id) => ({ type: INCREMENT_AMOUNT, id })

const decrementAmount = (id) => ({ type: DECREMENT_AMOUNT, id })

export const incrementAction = (dispatch, getState) => (id) => {
  dispatch(decrementStock(id))
  const { cart: { amount } } = getState()
  selectIdItem(amount, id).amount > 0 && dispatch(incrementAmount(id))
}
export const decrementAction = (dispatch, getState) => (id) => {
  dispatch(incrementStock(id))
  dispatch(decrementAmount(id))
}
const selectIdItem = (stateSlice, id) => stateSlice.find(e => e.id === id)
