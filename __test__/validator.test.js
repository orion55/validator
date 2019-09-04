const Validator = require('../src/js/validator')

describe('Validator', () => {
  const valid = new Validator({})

  test('notEmpty', () => {
    expect(valid.notEmpty('')).toBe(false)
    expect(valid.notEmpty('abc')).toBe(true)
  })
})
