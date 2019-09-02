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

  isValid () {
    return false
  }

  checkIt () {
    console.log(this.emailForm.val())
    Swal.fire({
      title: 'Успешно!',
      text: this.emailForm.val(),
      type: 'success',
      confirmButtonText: 'Ok',
      heightAuto: false
    })
  }

  showError (msg) {
    console.log(msg)
  }

  showSuccess (msg) {
    console.log(msg)
  }

  onCatchError (response) {
    const json = response.responseJSON,
      message = (json && json.error) ? json.error : response.statusText

    console.log('ERROR: ', message)
  }
}
