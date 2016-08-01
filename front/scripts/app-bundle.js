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
      cfg.title = '... mumble';
      cfg.map([{ route: ['', 'home'], moduleId: 'components/chat', title: 'home' }, { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' }, { route: 'account/login', name: 'login', moduleId: 'users/login' }, { route: 'account/register', name: 'register', moduleId: 'users/register' }]);
    };

    return App;
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
define('app/profile',["exports"], function (exports) {
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
define('components/bootstrap-tooltip',['exports', 'aurelia-framework', 'bootstrap'], function (exports, _aureliaFramework, _bootstrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BootstrapTooltip = undefined;

  var _bootstrap2 = _interopRequireDefault(_bootstrap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var BootstrapTooltip = exports.BootstrapTooltip = (_dec = (0, _aureliaFramework.customAttribute)('bootstrap-tooltip'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function BootstrapTooltip(element) {
      _classCallCheck(this, BootstrapTooltip);

      this.element = element;
    }

    BootstrapTooltip.prototype.bind = function bind() {
      (0, _bootstrap2.default)(this.element).tooltip();
    };

    BootstrapTooltip.prototype.unbind = function unbind() {
      (0, _bootstrap2.default)(this.element).tooltip('destroy');
    };

    return BootstrapTooltip;
  }()) || _class) || _class);
});
define('components/chat-main',[], function () {});
define('components/chat',['exports', '../app/profile', 'jquery', 'bootstrap'], function (exports, _profile, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Chat = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Chat = exports.Chat = function () {
    function Chat() {
      _classCallCheck(this, Chat);

      this.appName = '... mumble';
      this.navigation = 1;
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
        this.navigation = 2;
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

    Chat.prototype.toggleNavigation = function toggleNavigation() {
      if (this.navigation == 2) {
        this.navigation = 1;
      } else {
        this.navigation = 2;
      }
    };

    return Chat;
  }();
});
define('components/navbar',['exports', 'aurelia-framework', 'jquery'], function (exports, _aureliaFramework, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.navbar = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var navbar = exports.navbar = (_dec = (0, _aureliaFramework.customAttribute)('navbar'), _dec2 = (0, _aureliaFramework.inject)(Element), _dec(_class = _dec2(_class = function () {
    function navbar(element) {
      _classCallCheck(this, navbar);

      this.element = element;
      this.parent = (0, _jquery2.default)(element).parent();
      console.log(this.parent);
    }

    navbar.prototype.attached = function attached() {
      var _this = this;

      this.element.addEventListener('click', function () {
        return _this.open();
      });
      console.log(this.parent);
    };

    navbar.prototype.deattached = function deattached() {
      var _this2 = this;

      this.element.removeEventListener('click', function () {
        return _this2.open();
      });
    };

    navbar.prototype.open = function open() {
      console.log(this.element);
      console.log(this.parent);
      if ((0, _jquery2.default)(this.parent).is('.active')) {
        console.log('Is active');
        (0, _jquery2.default)(this.parent).removeClass('active active-sm');
        (0, _jquery2.default)('ul:first', this.parent).slideUp();
      } else {
        console.log('Is not active');
        (0, _jquery2.default)(this.parent).addClass('active');
        (0, _jquery2.default)('ul:first', this.parent).slideDown();
      }
    };

    return navbar;
  }()) || _class) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('web-api',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var latency = 200;
  var id = 0;

  function getId() {
    return ++id;
  }

  var contacts = [{
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  }];

  var WebAPI = exports.WebAPI = function () {
    function WebAPI() {
      _classCallCheck(this, WebAPI);

      this.isRequesting = false;
    }

    WebAPI.prototype.getContactList = function getContactList() {
      var _this = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var results = contacts.map(function (x) {
            return {
              id: x.id,
              firstName: x.firstName,
              lastName: x.lastName,
              email: x.email
            };
          });
          resolve(results);
          _this.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getContactDetails = function getContactDetails(id) {
      var _this2 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var found = contacts.filter(function (x) {
            return x.id == id;
          })[0];
          resolve(JSON.parse(JSON.stringify(found)));
          _this2.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.saveContact = function saveContact(contact) {
      var _this3 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var instance = JSON.parse(JSON.stringify(contact));
          var found = contacts.filter(function (x) {
            return x.id == contact.id;
          })[0];

          if (found) {
            var index = contacts.indexOf(found);
            contacts[index] = instance;
          } else {
            instance.id = getId();
            contacts.push(instance);
          }

          _this3.isRequesting = false;
          resolve(instance);
        }, latency);
      });
    };

    return WebAPI;
  }();
});
define('data/web-api',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var latency = 200;
  var id = 0;

  function getId() {
    return ++id;
  }

  var contacts = [{
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  }, {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  }];
  id = 0;
  var channels = [{
    id: getId(),
    channelName: 'General'
  }, {
    id: getId(),
    channelName: 'Development'
  }, {
    id: getId(),
    channelName: 'Design'
  }];

  var WebAPI = exports.WebAPI = function () {
    function WebAPI() {
      _classCallCheck(this, WebAPI);

      this.isRequesting = false;
    }

    WebAPI.prototype.getContactList = function getContactList() {
      var _this = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var results = contacts.map(function (x) {
            return {
              id: x.id,
              firstName: x.firstName,
              lastName: x.lastName,
              email: x.email
            };
          });
          resolve(results);
          _this.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getChannelList = function getChannelList() {
      var _this2 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var results = channels.map(function (x) {
            return {
              id: x.id,
              channelName: x.channelName,
              users: ['User1', 'User2', 'User3']
            };
          });
          resolve(results);
          _this2.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getContactDetails = function getContactDetails(id) {
      var _this3 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var found = contacts.filter(function (x) {
            return x.id == id;
          })[0];
          resolve(JSON.parse(JSON.stringify(found)));
          _this3.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.saveContact = function saveContact(contact) {
      var _this4 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var instance = JSON.parse(JSON.stringify(contact));
          var found = contacts.filter(function (x) {
            return x.id == contact.id;
          })[0];

          if (found) {
            var index = contacts.indexOf(found);
            contacts[index] = instance;
          } else {
            instance.id = getId();
            contacts.push(instance);
          }

          _this4.isRequesting = false;
          resolve(instance);
        }, latency);
      });
    };

    return WebAPI;
  }();
});
define('components/contact-list',['exports', '../data/web-api'], function (exports, _webApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContactList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ContactList = exports.ContactList = function () {
    ContactList.inject = function inject() {
      return [_webApi.WebAPI];
    };

    function ContactList(api) {
      _classCallCheck(this, ContactList);

      this.api = api;
      this.contacts = [];
    }

    ContactList.prototype.created = function created() {
      var _this = this;

      this.api.getContactList().then(function (contacts) {
        return _this.contacts = contacts;
      });
    };

    ContactList.prototype.select = function select(contact) {
      this.selectedId = contact.id;
      return true;
    };

    return ContactList;
  }();
});
define('components/channel-list',['exports', '../data/web-api'], function (exports, _webApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChannelList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChannelList = exports.ChannelList = function () {
    ChannelList.inject = function inject() {
      return [_webApi.WebAPI];
    };

    function ChannelList(api) {
      _classCallCheck(this, ChannelList);

      this.api = api;
      this.channels = [];
    }

    ChannelList.prototype.created = function created() {
      var _this = this;

      this.api.getChannelList().then(function (channels) {
        return _this.channels = channels;
      });
    };

    ChannelList.prototype.select = function select(channel) {
      this.selectedId = channel.id;
      return true;
    };

    return ChannelList;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"page-host\">\r\n    <router-view layout=\"views/layout-app\"></router-view>\r\n  </div>\r\n</template>"; });
define('text!components/chat-main.html', ['module'], function(module) { module.exports = "<template> \r\n    <div class=\"row\">\r\n        <div class=\"col-md-4 col-sm-6 col-xs-12\">\r\n            <div class=\"x_panel\">\r\n            <div class=\"x_title\">\r\n                <h2><i class=\"fa fa-user\"></i> ${fullName()} <small>messages</small></h2>\r\n                <ul class=\"nav navbar-right panel_toolbox\">\r\n                </li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                    <ul class=\"dropdown-menu\" role=\"menu\">\r\n                    <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                    </li>\r\n                    <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                    </li>\r\n                    </ul>\r\n                </li>\r\n                <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                </li>\r\n                </ul>\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n            <div class=\"x_content\">\r\n                <div class=\"dashboard-widget-content\">\r\n                <div class=\"col-md-12\">\r\n                <ul class=\"list-unstyled msg_list\">\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face7.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Michael Long</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Hey bro, I really need your help on some stuff..\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"message_dark\">\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face2.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>John Doe</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        What do you need?\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face7.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Michael Long</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Im stuck on this issue, and cannot debug it.. Can you help?\r\n                        <img src=\"images/error.png\">\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"message_dark\">\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face2.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>John Doe</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        That means that you are breaking the syntax rules, you need to check the documentation and follow their parameters.\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                </ul>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <label class=\"control-label\">\r\n                    <a click.trigger=\"addUser()\" class=\"btn btn-app\">\r\n                    <i class=\"fa fa-envelope-o\"></i> send\r\n                    </a>\r\n                    </label>\r\n                </div>\r\n                </div>\r\n                </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4 col-sm-6 col-xs-12\">\r\n            <div class=\"x_panel\">\r\n            <div class=\"x_title\">\r\n                <h2><i class=\"fa fa-hashtag\"></i> Development <small>channels</small></h2>\r\n                <ul class=\"nav navbar-right panel_toolbox\">\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                    <ul class=\"dropdown-menu\" role=\"menu\">\r\n                    <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                    </li>\r\n                    <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                    </li>\r\n                    </ul>\r\n                </li>\r\n                <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                </li>\r\n                </ul>\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n            <div class=\"x_content\">\r\n                <div class=\"dashboard-widget-content\">\r\n                <div class=\"col-md-12\">\r\n                <ul class=\"list-unstyled msg_list\">\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Borat</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Hey guys, how's the app developing so far?'\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"message_dark\">\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face2.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>John Doe</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Buggy buggy, we need more resources or time to get this done.\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face4.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Daniel Ting</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Yea, this is no where close to release.\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Borat</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Okay, time is running out - please focus more resources on this app to meet deadline.\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                </ul>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <label class=\"control-label\">\r\n                    <a click.trigger=\"addUser()\" class=\"btn btn-app\">\r\n                    <i class=\"fa fa-envelope-o\"></i> send\r\n                    </a>\r\n                    </label>\r\n                </div>\r\n                </div>\r\n                </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-4 col-sm-6 col-xs-12\">\r\n            <div class=\"x_panel\">\r\n            <div class=\"x_title\">\r\n                <h2><i class=\"fa fa-user\"></i> General <small>channels</small></h2>\r\n                <ul class=\"nav navbar-right panel_toolbox\">\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                    <ul class=\"dropdown-menu\" role=\"menu\">\r\n                    <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                    </li>\r\n                    <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                    </li>\r\n                    </ul>\r\n                </li>\r\n                <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                </li>\r\n                </ul>\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n            <div class=\"x_content\">\r\n                <div class=\"dashboard-widget-content\">\r\n                <div class=\"col-md-12\">\r\n                <ul class=\"list-unstyled msg_list\">\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face6.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Samuel Goulding</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Can someone link me with a good Ember tutorial?\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"message_dark\">\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face2.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>John Doe</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        <iframe src=\"http://www.youtube.com/embed/T1SC44NJA_A\"\r\n                            width=\"427\" height=\"240\" frameborder=\"0\" allowfullscreen></iframe>\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face3.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Daniel Ting</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Very informative.\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\">\r\n                        <img src=\"images/face.ico\" alt=\"img\">\r\n                    </span>\r\n                    <span>\r\n                        <span>Borat</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Who can link me with a borat movie!\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                </ul>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                </div>\r\n                <div class=\"col-md-3\">\r\n                    <label class=\"control-label\">\r\n                    <a click.trigger=\"addUser()\" class=\"btn btn-app\">\r\n                    <i class=\"fa fa-envelope-o\"></i> send\r\n                    </a>\r\n                    </label>\r\n                </div>\r\n                </div>\r\n                </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>\r\n"; });
define('text!components/chat.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class.bind=\"navigation == 1 ? 'nav-sm' : 'nav-md'\">\r\n    <div class=\"main-wrapper body\">\r\n      <div class=\"main_container\">\r\n        <div slot=\"leftView\">\r\n          <compose view=\"./leftView.html\"></compose>\r\n        </div>\r\n        <div slot=\"topNav\">\r\n          <compose view=\"./top-nav.html\"></compose>\r\n        </div>\r\n        <div slot=\"rightView\">\r\n          <div class=\"right_col\" role=\"main\">\r\n            <compose view=\"./chat-main.html\"></compose>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/leftView.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"col-md-3 left_col\">\r\n        <div class=\"left_col scroll-view\">\r\n            <div class=\"navbar nav_title\" style=\"border: 0;\">\r\n                <a href=\"#\" class=\"site_title\"><i class=\"fa fa-ellipsis-h\"></i> <span>mumble</span></a>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n    <compose view=\"./sidebar-profile.html\"></compose>\r\n    <compose view=\"./sidebar-menu.html\"></compose>\r\n    <compose view=\"./sidebar-footer.html\"></compose>\r\n      </div>\r\n    </div>\r\n</template>"; });
define('text!components/rightView.html', ['module'], function(module) { module.exports = "<template>\r\n    <compose view=\"./chat-main.html\"></compose>\r\n</template>"; });
define('text!components/sidebar-footer.html', ['module'], function(module) { module.exports = "<template> \r\n  <require from=\"./bootstrap-tooltip\"></require>\r\n    <!-- /menu footer buttons -->\r\n    <div class=\"sidebar-footer hidden-small\">\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Profile\">\r\n           <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Settings\">\r\n          <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lock\">\r\n          <span class=\"glyphicon glyphicon-eye-close\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Logout\">\r\n           <span class=\"glyphicon glyphicon-off\" aria-hidden=\"true\"></span>\r\n        </a>\r\n    </div>\r\n</template> \r\n"; });
define('text!components/sidebar-menu.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <require from=\"./contact-list\"></require>\r\n    <require from=\"./channel-list\"></require>\r\n\r\n    <div id=\"sidebar-menu\" class=\"main_menu_side hidden-print main_menu\">\r\n        <div class=\"menu_section active\">\r\n            <h3 style=\"\r\n            padding-top: 100px;\r\n            font-size: 15px;\r\n        \">General</h3>\r\n            <ul class=\"nav side-menu\">\r\n                <channel-list><!-- Channels menu --></channel-list>\r\n                <contact-list><!-- Messages menu --></contact-list>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!components/sidebar-profile.html', ['module'], function(module) { module.exports = "<template> \r\n    <div class=\"clearfix\"></div>\r\n    <!-- menu profile quick info -->\r\n    <div class=\"profile\">\r\n        <div class=\"profile_pic\">\r\n           <img src=\"images/face2.ico\" alt=\"...\" class=\"img-circle profile_img\">\r\n        </div>\r\n        <div class=\"profile_info\">\r\n          <span>Welcome,</span>\r\n          <h2>${getfName} ${getlName}</h2>\r\n        </div>\r\n    </div>\r\n</template> \r\n"; });
define('text!components/top-nav.html', ['module'], function(module) { module.exports = "<template> \r\n    <div class=\"top_nav\">\r\n        <div class=\"nav_menu\">\r\n        <nav>\r\n            <div class=\"nav toggle\">\r\n            <a click.delegate=\"toggleNavigation()\"><i class=\"fa fa-bars\"></i></a>\r\n            </div>\r\n\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n            <li class=\"\">\r\n                <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                <img src=\"images/face2.ico\" alt=\"\">John Doe\r\n                <i class=\" fa fa-angle-down\"></i>\r\n                </a>\r\n                <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                <li><a href=\"javascript:;\"> Profile</a></li>\r\n                <li>\r\n                    <a href=\"javascript:;\">\r\n                    <span class=\"badge bg-red pull-right\">50%</span>\r\n                    <span>Settings</span>\r\n                    </a>\r\n                </li>\r\n                <li><a href=\"javascript:;\">Help</a></li>\r\n                <li><a href=\"login.html\"><i class=\"fa fa-sign-out pull-right\"></i> Log Out</a></li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li role=\"presentation\" class=\"dropdown\">\r\n                <a href=\"javascript:;\" class=\"dropdown-toggle info-number\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                <i class=\"fa fa-envelope-o\"></i>\r\n                <span class=\"badge bg-green\">6</span>\r\n                </a>\r\n                <ul id=\"menu1\" class=\"dropdown-menu list-unstyled msg_list\" role=\"menu\">\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <div class=\"text-center\">\r\n                    <a>\r\n                        <strong>See All Alerts</strong>\r\n                        <i class=\"fa fa-angle-right\"></i>\r\n                    </a>\r\n                    </div>\r\n                </li>\r\n                </ul>\r\n            </li>\r\n            </ul>\r\n        </nav>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!users/login.html', ['module'], function(module) { module.exports = "<template>\r\n<h1>Login</h1>\r\n</template>"; });
define('text!views/layout-app.html', ['module'], function(module) { module.exports = "<template>\r\n    <!-- leftView -->\r\n    <slot name=\"leftView\"></slot>\r\n    <!-- leftView -->\r\n    <slot name=\"topNav\"></slot>\r\n    <!-- rightView -->\r\n    <slot name=\"rightView\"></slot>\r\n    <!-- rightView -->\r\n</template>"; });
define('text!components/contact-list.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <li class=\"\">\r\n        <a navbar>\r\n            <i class=\"fa fa-envelope\"></i> Messages <span class=\"fa fa-chevron-down\"></span>\r\n        </a>\r\n        <ul class=\"nav child_menu\" style=\"display: none;\">\r\n            <li class=\"current-page\"><a href=\"#\">New Message <span class=\"fa fa-plus\"></span></a></li>\r\n            <li repeat.for=\"contact of contacts\"><a href=\"#\">${contact.firstName} ${contact.lastName}</a></li>\r\n        </ul>\r\n    </li>\r\n</template>"; });
define('text!components/channel-list.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <li class=\"\">\r\n        <a navbar>\r\n            <i class=\"fa fa-hashtag\"></i> Channels <span class=\"fa fa-chevron-down\"></span>\r\n        </a>\r\n        <ul class=\"nav child_menu\" style=\"display: none;\">\r\n            <li class=\"current-page\"><a href=\"#\">New Channel <span class=\"fa fa-plus\"></span></a></li>\r\n            <li repeat.for=\"channel of channels\"><a href=\"#\">${channel.channelName}</a></li>\r\n        </ul>\r\n    </li>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map