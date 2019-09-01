class Validator {
  constructor (options) {
    const flagCheckIdEmail = this.checkIdEmail(options)

    let flagLoadInfo = false
    this.loadInfo()
      .done((info) => {
        this.info = info
        flagLoadInfo = true
      })
      .always(() => {
        if (flagCheckIdEmail && flagLoadInfo) {
          this.emailForm.keypress((event) => {
            if (event.which === 13) {
              event.preventDefault()
              this.checkIt()
              return true
            }
          })
        }
      })
    return false
  }

  checkIdEmail (options) {
    if ('idEmail' in options) {
      this.emailForm = $('#' + options.idEmail)
      if (this.emailForm.length !== 0) {
        return true
      }
    }
    return false
  }

  loadInfo () {
    return $.get('json/info.json')
      .then((info) => {
        return info
      })
      .fail((error) => {
        this.onCatchError(error)
      })
  }

  isValid () {
    return false
  }

  checkIt () {
    console.log(this.emailForm.val())
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
