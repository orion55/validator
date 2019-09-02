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
      return false;
    }
  }, {
    key: "checkIt",
    value: function checkIt() {
      var valueEmail = this.emailForm.val().trim();

      if (this.notEmpty(valueEmail)) {
        this.isValid(valueEmail);
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
        heightAuto: false
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
        heightAuto: false
      });
    }
  }]);

  return Validator;
}();