/**
 * Класс валидатора email
 * @author Гребенёв Олег <admin@infoblog72.ru>
 */
class Validator {
  /**
   * Конструктор валидатора email
   * @typedef {Object} Options Набор опций валидатора
   * @property {string} options.idEmail Идентификатор поля ввода email
   * @param {Options} options
   */
  constructor (options) {
    //Более грамотно получить эти данные через json с сервера, но задача учебная...
    this.mailboxlayer = {
      url: 'https://apilayer.net/api/check',
      key: 'c6f315c07bca4e3ab5a6fd8fca2b6c58',
    }
    this.checkIdEmail(options)
  }

  /**
   * Функция проверки переданных параметров в конструктор.
   *
   * @param {Options} options - Проверяемый набор опций
   * @return {boolean} Результат проверки
   */
  checkIdEmail (options) {
    if ('idEmail' in options) {
      this.emailForm = $('#' + options.idEmail)
      if (this.emailForm.length !== 0) {
        this.emailForm.keypress((event) => {
          if (event.which === 13) {
            event.preventDefault()
            this.checkIt()
            return true
          }
        })
      }
    }
    return false
  }

  /**
   * Функция проверки, являеться ли строка пустой.
   *
   * @param {string} val - проверяемая строка
   * @return {boolean} Результат проверки
   *
   * @example
   *
   *     notEmpty('mail@mail.ru')
   */
  notEmpty (val) {
    return val !== ''
    // return true
  }

  /**
   * Функция проверки email с использованием сервиса https://mailboxlayer.com/.
   *
   * @param {string} val - проверяемая строка
   * @return {Promise<(boolean|string)>} Результат проверки
   *
   * @example
   *
   *     isValid('mail@mail.ru')
   */
  isValid (val) {
    return new Promise((resolve, reject) => {
      $.get(
        this.mailboxlayer.url,
        {
          access_key: this.mailboxlayer.key,
          email: val,
          smtp: 1,
          format: 1,
        })
        .done((data) => {
          if ('format_valid' in data && 'smtp_check' in data) {
            resolve(data.format_valid && data.smtp_check)
          }
          if ('success' in data) {
            if (!data.success) {
              reject(data.error.info)
            }
          }
        })
        .fail((error) => {
          reject(error.statusText)
        })
    })
  }

  /**
   * Функция выводящая всплывающее окно с результатом проверки email
   */
  checkIt () {
    const valueEmail = this.emailForm.val().trim()
    if (this.notEmpty(valueEmail)) {
      this.isValid(valueEmail)
        .then(
          (flag) => {
            if (flag) {
              this.showSuccess('Email корректен и существует!')
            } else {
              this.showError('Email не прошёл проверку!')
            }
          },
          (error) => {
            this.showError(error)
          })

    } else {
      this.showError('Поле Email пустое!')
    }
  }

  /**
   * Функция выводит всплывающее окно с ошибкой.
   *
   * @param {string} msg - Сообщение об ошибке
   *
   * @example
   *     showError('Всё плохо!')
   */
  showError (msg) {
    Swal.fire({
      title: 'Ошибка!',
      text: msg,
      type: 'error',
      confirmButtonText: 'Ok',
      heightAuto: false,
      confirmButtonColor: '#76b852',
    })
  }

  /**
   * Функция выводит всплывающее окно с успехом.
   *
   * @param {string} msg - Сообщение об успехе
   *
   * @example
   *     showError('Всё хорошо!')
   */
  showSuccess (msg) {
    Swal.fire({
      title: 'Успешно!',
      text: msg,
      type: 'success',
      confirmButtonText: 'Ok',
      heightAuto: false,
      confirmButtonColor: '#76b852',
    })
  }
}

module.exports = Validator
