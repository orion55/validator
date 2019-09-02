class Validator {
  constructor (options) {
    //Более грамотно получить эти данные через json с сервера, но задача учебная...
    this.mailboxlayer = {
      url: 'http://apilayer.net/api/check',
      key: 'c6f315c07bca4e3ab5a6fd8fca2b6c58',
    }
    this.checkIdEmail(options)
  }

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

  notEmpty (val) {
    return val !== ''
  }

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
