"use strict";

$(document).ready(function () {
  var valid = new Validator({
    idEmail: 'validate-email'
  });
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator(options) {
    _classCallCheck(this, Validator);

    //Более грамотно получить эти данные через json с сервера, но задача учебная...
    this.mailboxlayer = {
      url: 'http://apilayer.net/api/check',
      key: 'c6f315c07bca4e3ab5a6fd8fca2b6c58'
    };
    this.checkIdEmail(options);
  }

  _createClass(Validator, [{
    key: "checkIdEmail",
    value: function checkIdEmail(options) {
      var _this = this;

      if ('idEmail' in options) {
        this.emailForm = $('#' + options.idEmail);

        if (this.emailForm.length !== 0) {
          this.emailForm.keypress(function (event) {
            if (event.which === 13) {
              event.preventDefault();

              _this.checkIt();

              return true;
            }
          });
        }
      }

      return false;
    }
  }, {
    key: "notEmpty",
    value: function notEmpty(val) {
      return val !== '';
    }
  }, {
    key: "isValid",
    value: function isValid(val) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        $.get(_this2.mailboxlayer.url, {
          access_key: _this2.mailboxlayer.key,
          email: val,
          smtp: 1,
          format: 1
        }).done(function (data) {
          if ('format_valid' in data && 'smtp_check' in data) {
            resolve(data.format_valid && data.smtp_check);
          }

          if ('success' in data) {
            if (!data.success) {
              reject(data.error.info);
            }
          }
        }).fail(function (error) {
          reject(error.statusText);
        });
      });
    }
  }, {
    key: "checkIt",
    value: function checkIt() {
      var _this3 = this;

      var valueEmail = this.emailForm.val().trim();

      if (this.notEmpty(valueEmail)) {
        this.isValid(valueEmail).then(function (flag) {
          if (flag) {
            _this3.showSuccess('Email корректен и существует!');
          } else {
            _this3.showError('Email не прошёл проверку!');
          }
        }, function (error) {
          _this3.showError(error);
        });
      } else {
        this.showError('Поле Email пустое!');
      }
    }
  }, {
    key: "showError",
    value: function showError(msg) {
      Swal.fire({
        title: 'Ошибка!',
        text: msg,
        type: 'error',
        confirmButtonText: 'Ok',
        heightAuto: false,
        confirmButtonColor: '#76b852'
      });
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(msg) {
      Swal.fire({
        title: 'Успешно!',
        text: msg,
        type: 'success',
        confirmButtonText: 'Ok',
        heightAuto: false,
        confirmButtonColor: '#76b852'
      });
    }
  }]);

  return Validator;
}();