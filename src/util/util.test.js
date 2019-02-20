import { paginate, pageButtons } from './index'

describe('Testing pagination utils', () => {
  describe('items per page function', () => {
    const items = new Array(16).fill(0).map((e, i) => i + 1)
    describe('1-page', () => {
      let slice
      test('Has the right lenght', () => {
        slice = paginate(items, 1)
        expect(slice).toHaveLength(6)
      })
      test('Has the right items', () => {
        slice.forEach((e, i) => {
          expect(e).toBe(i + 1)
        })
      })
    })
    describe('2-pages', () => {
      let slice
      test('Has the right lenght', () => {
        slice = paginate(items, 2)
        expect(slice).toHaveLength(6)
      })
      test('Has the right items', () => {
        slice.forEach((e, i) => {
          expect(e).toBe(i + 7)
        })
      })
    })
    describe('Last page', () => {
      let slice
      test('Has the right lenght', () => {
        slice = paginate(items, 3)
        expect(slice).toHaveLength(4)
      })
      test('Has the right items', () => {
        slice.forEach((e, i) => {
          expect(e).toBe(i + 13)
        })
      })
    })
    describe('Page buttons', () => {
      test('Has the right number of pages', () => {
        const pages = pageButtons(items)
        expect(pages).toBe(3)
      })
      test('Has even number of pages', () => {
        const items = new Array(24).fill(0).map((e, i) => i + 1)
        const pages = pageButtons(items)
        expect(pages).toBe(4)
      })
    })
  })
})
