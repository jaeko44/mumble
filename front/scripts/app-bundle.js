define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    App.inject = function inject() {
      return [_aureliaRouter.Router];
    };

    function App(router) {
      _classCallCheck(this, App);

      this.router = router;
      this.router.configure(this.configureRoutes);
    }

    App.prototype.configureRoutes = function configureRoutes(cfg) {
      cfg.title = 'Mumble ';
      cfg.map([{ route: ['', ':filter'], moduleId: 'chat' }]);
    };

    return App;
  }();
});
define('chat',['exports', './profile'], function (exports, _profile) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Chat = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Chat = exports.Chat = function () {
    function Chat() {
      _classCallCheck(this, Chat);

      this.appName = '... mumble';
      this.setfName = '';
      this.getfName = 'Jonathan';
      this.setlName = '';
      this.getlName = 'Philipos';
      this.setEmail = '';
      this.getEmail = 'jonathan@det.io';
      this.user = new _profile.Profile();
    }

    Chat.prototype.addUser = function addUser() {
      if (this.setfName) {
        alert("Adding custom user now");
        this.user = new _profile.Profile(this.setfName, this.getlName, this.getEmail);
        this.getfName = this.setfName;
        this.setfName = '';
      } else {
        alert("Adding default user now");
        this.user = new _profile.Profile(this.getfName, this.getlName, this.getEmail);
      }
    };

    Chat.prototype.fullName = function fullName() {
      return this.getfName + ' ' + this.getlName;
    };

    Chat.prototype.updateEmail = function updateEmail() {
      if (this.setEmail) {
        this.user = new _profile.Profile(this.getfName, this.getlName, this.setEmail);
        this.getEmail = this.setEmail;
        this.setEmail = '';
      }
    };

    return Chat;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('profile',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Profile = exports.Profile = function () {
        function Profile(fName, lName, email) {
            _classCallCheck(this, Profile);

            this.fName = fName;
            this.lName = lName;
            this.email = email;
        }

        _createClass(Profile, [{
            key: "changefName",
            set: function set(fName) {
                this.fName = fName;
            }
        }, {
            key: "changelName",
            set: function set(lName) {
                this.lName = lName;
            }
        }, {
            key: "changeEmail",
            set: function set(email) {
                this.email = email;
            }
        }]);

        return Profile;
    }();
});
define('todo',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Todo = exports.Todo = function Todo(description) {
    _classCallCheck(this, Todo);

    this.description = description;
    this.done = false;
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n  <h1>${heading}</h1>\n</template>\n"; });
define('text!chat.html', ['module'], function(module) { module.exports = "<template>\r\n  <router-view></router-view>\r\n\r\n<form submit.trigger=\"addUser()\">\r\n  <input type=\"text\" value.bind=\"setfName\">\r\n  <button type=\"submit\">Add User</button>\r\n</form>\r\n\r\n  <ul>\r\n    <li>\r\n      <span>\r\n        ${user.fName}\r\n      </span>\r\n      <span>\r\n        ${user.lName}\r\n      </span>\r\n      <span>\r\n        ${user.email}\r\n      </span>\r\n    </li>    \r\n  </ul>\r\n\r\n  <form submit.trigger=\"updateEmail()\">\r\n  <input type=\"text\" value.bind=\"setEmail\">\r\n  <button type=\"submit\">Update Email</button>\r\n</form>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map