class Validator {
  constructor (options) {
    //Более грамотно получить эти данные через json с сервера, но задача учебная...
    this.mailboxlayer = {
      url: 'http://apilayer.net/api/check',
      key: 'c6f315c07bca4e3ab5a6fd8fca2b6c58'
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
    return false
  }

  checkIt () {
    const valueEmail = this.emailForm.val().trim()
    if (this.notEmpty(valueEmail)) {
      this.isValid(valueEmail)
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
      confirmButtonColor: '#76b852'
    })
  }

  showSuccess (msg) {
    Swal.fire({
      title: 'Успешно!',
      text: msg,
      type: 'success',
      confirmButtonText: 'Ok',
      heightAuto: false,
      confirmButtonColor: '#76b852'
    })
  }
}
