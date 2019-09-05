const Validator = require('../src/js/validator')

describe('Validator', () => {
  let valid

  beforeEach(() => {
    valid = new Validator({})
  })

  it('notEmpty - Проверка на пустоту строки', () => {
    expect(valid.notEmpty('')).toBe(false)
    expect(valid.notEmpty('abc')).toBe(true)
  })

  it('checkIdEmail - Проверка пуст ли список опций', () => {
    expect(valid.checkIdEmail({})).toBe(false)
  })


})
