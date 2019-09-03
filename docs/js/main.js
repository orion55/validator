"use strict";

$(document).ready(function () {
  new Validator({
    idEmail: 'validate-email'
  });
});
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Класс валидатора email
 * @author Гребенёв Олег <admin@infoblog72.ru>
 */
var Validator =
/*#__PURE__*/
function () {
  /**
   * Конструктор валидатора email
   * @typedef {Object} Options Набор опций валидатора
   * @property {string} options.idEmail Идентификатор поля ввода email
   * @param {Options} options
   */
  function Validator(options) {
    _classCallCheck(this, Validator);

    //Более грамотно получить эти данные через json с сервера, но задача учебная...
    this.mailboxlayer = {
      url: 'https://apilayer.net/api/check',
      key: 'c6f315c07bca4e3ab5a6fd8fca2b6c58'
    };
    this.checkIdEmail(options);
  }
  /**
   * Функция проверки переданных параметров в конструктор.
   *
   * @param {Options} options - Проверяемый набор опций
   * @return {boolean} Результат проверки
   */


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

  }, {
    key: "notEmpty",
    value: function notEmpty(val) {
      return val !== '';
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
    /**
     * Функция выводящая всплывающее окно с результатом проверки email
     */

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
    /**
     * Функция выводит всплывающее окно с ошибкой.
     *
     * @param {string} msg - Сообщение об ошибке
     *
     * @example
     *     showError('Всё плохо!')
     */

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
    /**
     * Функция выводит всплывающее окно с успехом.
     *
     * @param {string} msg - Сообщение об успехе
     *
     * @example
     *     showError('Всё хорошо!')
     */

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