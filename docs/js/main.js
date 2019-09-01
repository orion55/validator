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
    var _this = this;

    _classCallCheck(this, Validator);

    var flagCheckIdEmail = this.checkIdEmail(options);
    var flagLoadInfo = false;
    this.loadInfo().done(function (info) {
      _this.info = info;
      flagLoadInfo = true;
    }).always(function () {
      if (flagCheckIdEmail && flagLoadInfo) {
        _this.emailForm.keypress(function (event) {
          if (event.which === 13) {
            event.preventDefault();

            _this.checkIt();

            return true;
          }
        });
      }
    });
    return false;
  }

  _createClass(Validator, [{
    key: "checkIdEmail",
    value: function checkIdEmail(options) {
      if ('idEmail' in options) {
        this.emailForm = $('#' + options.idEmail);

        if (this.emailForm.length !== 0) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "loadInfo",
    value: function loadInfo() {
      var _this2 = this;

      return $.get('json/info.json').then(function (info) {
        return info;
      }).fail(function (error) {
        _this2.onCatchError(error);
      });
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return false;
    }
  }, {
    key: "checkIt",
    value: function checkIt() {
      console.log(this.emailForm.val());
    }
  }, {
    key: "showError",
    value: function showError(msg) {
      console.log(msg);
    }
  }, {
    key: "showSuccess",
    value: function showSuccess(msg) {
      console.log(msg);
    }
  }, {
    key: "onCatchError",
    value: function onCatchError(response) {
      var json = response.responseJSON,
          message = json && json.error ? json.error : response.statusText;
      console.log('ERROR: ', message);
    }
  }]);

  return Validator;
}();