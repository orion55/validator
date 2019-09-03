const Validator = require('./validator')

describe('Validator', () => {
  const valid = new Validator({})

  test('notEmpty', () => {
    expect(valid.notEmpty('')).toBe(false)
    expect(valid.notEmpty('abc')).toBe(true)
  })
})
