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
define('app/profile',['exports', '../data/web-api'], function (exports, _webApi) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Profile = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Profile = exports.Profile = function () {
        Profile.inject = function inject() {
            return [_webApi.WebAPI];
        };

        function Profile(api) {
            _classCallCheck(this, Profile);

            this.api = api;
            this.contacts = [];
            this.user = '';
        }

        Profile.prototype.getUser = function getUser(userId) {
            var _this = this;

            this.api.getContactDetails(userId).then(function (user) {
                return _this.user = user;
            });
            return this.user;
        };

        Profile.prototype.getProfile = function getProfile() {
            return this.api.getProfile();
        };

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
define('components/chat-main',[], function () {});
define('components/chat',['exports', '../app/profile', 'aurelia-framework', 'jquery', 'bootstrap'], function (exports, _profile, _aureliaFramework, _jquery) {
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

  var _dec, _class;

  var Chat = exports.Chat = (_dec = (0, _aureliaFramework.inject)(_profile.Profile), _dec(_class = function () {
    function Chat(profile) {
      _classCallCheck(this, Chat);

      this.profile = profile;
      this.account = profile.getProfile();
      this.appName = 'mumble';
      this.navigation = 1;
    }

    Chat.prototype.fullName = function fullName() {
      console.log('printing account1');
      console.log(this.account);
      return this.account.firstName + ' ' + this.account.lastName;
    };

    Chat.prototype.toggleNavigation = function toggleNavigation() {
      if (this.navigation == 2) {
        this.navigation = 1;
      } else {
        this.navigation = 2;
      }
    };

    return Chat;
  }()) || _class);
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

  var alertDelay = 5000;

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

    ContactList.prototype.refresh = function refresh(contact) {
      if (contact.unreadMsgs >= 1) {
        contact.unreadMsgs = 0;
        contact.alert = 3;
      } else {
        contact.unreadMsgs = 2;
        setTimeout(function () {
          contact.alert = 2;
        }, alertDelay);
        contact.alert = 1;
      }
    };

    return ContactList;
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
  var myAccount = {
    id: getId(),
    firstName: 'Jonathan',
    lastName: 'Philipos',
    email: 'jonathan@det.io',
    phoneNumber: '867-5309',
    isOnline: 'online',
    icon: 'face5.ico'
  };
  var contacts = [{
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 0,
    icon: 'face.ico'
  }, {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'online',
    unreadMsgs: 4,
    icon: 'face2.ico'
  }, {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0,
    icon: 'face3.ico'
  }, {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'away',
    unreadMsgs: 1,
    icon: 'face4.ico'
  }, {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309',
    isOnline: 'offline',
    unreadMsgs: 0,
    icon: 'face5.ico'
  }];
  id = 0;
  var activeChats = [{
    id: getId(),
    type: 'message',
    title: 'Michael Long',
    messages: [{
      from: 2,
      data: 'Hey bro, I really need your help on some stuff..',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 1,
      data: 'What do you need?',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 2,
      data: 'Im stuck on this issue, and cannot debug it.. Can you help?',
      attachments: [{
        type: 'image',
        id: 'error.png'
      }]
    }, {
      from: 1,
      data: 'That means that you are breaking the syntax rules, you need to check the documentation and follow their parameters.',
      date: '2012-04-23T18:25:43.511Z'
    }]
  }, {
    id: getId(),
    type: 'channel',
    title: 'Development',
    messages: [{
      from: 3,
      data: 'Hey guys, how\'s the app developing so far?',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 1,
      data: 'Buggy buggy, we need more resources or time to get this done.',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 4,
      data: 'Yea, this is no where close to release.',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 3,
      data: 'Hey guys, how\'s the app developing so far?',
      date: '2012-04-23T18:25:43.511Z'
    }]
  }, {
    id: getId(),
    type: 'channel',
    title: 'General',
    messages: [{
      from: 5,
      data: 'Can someone link me with a good Ember tutorial?',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 1,
      data: '',
      date: '2012-04-23T18:25:43.511Z',
      attachments: [{
        type: 'video',
        id: 'T1SC44NJA_A'
      }]
    }, {
      from: 4,
      data: 'Very informative.',
      date: '2012-04-23T18:25:43.511Z'
    }, {
      from: 3,
      data: 'Who can link me with a borat movie!',
      date: '2012-04-23T18:25:43.511Z'
    }]
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
              email: x.email,
              isOnline: x.isOnline,
              alert: 1,
              unreadMsgs: x.unreadMsgs
            };
          });
          resolve(results);
          _this.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getMsgs = function getMsgs() {
      var _this2 = this;

      this.isRequesting = true;
      return new Promise(function (resolve) {
        setTimeout(function () {
          var results = activeChats.map(function (x) {
            return {
              id: x.id,
              type: x.type,
              title: x.title,
              messages: x.messages
            };
          });
          resolve(results);
          _this2.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getChannelList = function getChannelList() {
      var _this3 = this;

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
          _this3.isRequesting = false;
        }, latency);
      });
    };

    WebAPI.prototype.getContactDetails = function getContactDetails(id) {
      var found = contacts.filter(function (x) {
        return x.id == id;
      })[0];
      return found;
    };

    WebAPI.prototype.getProfile = function getProfile() {
      return myAccount;
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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/chat-tile',['exports', '../data/web-api', '../app/profile', 'aurelia-framework'], function (exports, _webApi, _profile, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.chatTile = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var chatTile = exports.chatTile = (_dec = (0, _aureliaFramework.inject)(_webApi.WebAPI, _profile.Profile), _dec(_class = function () {
        function chatTile(api, profile) {
            _classCallCheck(this, chatTile);

            this.profile = profile;
            this.api = api;
            this.account = profile.getProfile();
            this.activeChats = [];
        }

        chatTile.prototype.created = function created() {
            var _this = this;

            this.api.getMsgs().then(function (activeChats) {
                return _this.activeChats = activeChats;
            });
        };

        chatTile.prototype.userDetails = function userDetails(userId) {
            if (userId == 1) {
                return this.api.getProfile();
            } else {
                return this.api.getContactDetails(userId);
            }
        };

        chatTile.prototype.displayChats = function displayChats() {
            alert('Display chats called');
            console.log('Folllowed by activechats array: [] ');
            console.log(this.activeChats);
        };

        return chatTile;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"page-host\">\r\n    <router-view layout=\"views/layout-app\"></router-view>\r\n  </div>\r\n</template>"; });
define('text!components/channel-list.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <li class=\"\">\r\n        <a navbar>\r\n            <i class=\"fa fa-hashtag\"></i> Channels <span class=\"fa fa-chevron-down\"></span>\r\n        </a>\r\n        <ul class=\"nav child_menu\" style=\"display: none;\">\r\n            <li class=\"current-page\"><a href=\"#\">New Channel <span class=\"fa fa-plus\"></span></a></li>\r\n            <li repeat.for=\"channel of channels\"><a href=\"#\">${channel.channelName}</a></li>\r\n        </ul>\r\n    </li>\r\n</template>"; });
define('text!components/chat-main.html', ['module'], function(module) { module.exports = "<template> \r\n    <require from=\"./chat-tile\"></require>\r\n    <div class=\"row\">\r\n        <chat-tile></chat-tile>\r\n    </div>\r\n</template>\r\n"; });
define('text!components/chat.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class.bind=\"navigation == 1 ? 'nav-sm' : 'nav-md'\">\r\n    <div class=\"main-wrapper body\">\r\n      <div class=\"main_container\">\r\n        <div slot=\"leftView\">\r\n          <compose view=\"./leftView.html\"></compose>\r\n        </div>\r\n        <div slot=\"topNav\">\r\n          <compose view=\"./top-nav.html\"></compose>\r\n        </div>\r\n        <div slot=\"rightView\">\r\n          <div class=\"right_col\" role=\"main\">\r\n            <compose view=\"./chat-main.html\"></compose>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!components/contact-list.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <li class=\"\">\r\n        <a navbar>\r\n            <i class=\"fa fa-envelope\"></i> Messages <span class=\"fa fa-chevron-down\"></span>\r\n        </a>\r\n        <ul class=\"nav child_menu\" style=\"display: none;\">\r\n            <li class=\"current-page\"><a href=\"#\">New Message <span class=\"fa fa-plus\"></span></a></li>\r\n            <li click.trigger=\"refresh(contact)\" repeat.for=\"contact of contacts\" class.bind=\"contact.isOnline == 'online' ? 'online' : contact.isOnline == 'away' ? 'away' : ''\">\r\n                <a>${contact.firstName} ${contact.lastName}\r\n                <span show.bind=\"contact.unreadMsgs >= 1\" class.bind=\"contact.alert == 1  ? 'bg-red' : contact.alert == 2  ? 'bg-red cooldown' : 'bg-red'\" class=\"badge pull-right\">${contact.unreadMsgs}</span></a></li>\r\n        </ul>\r\n    </li>\r\n</template>"; });
define('text!components/leftView.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"col-md-3 left_col\">\r\n        <div class=\"left_col scroll-view\">\r\n            <div class=\"navbar nav_title\" style=\"border: 0;\">\r\n                <a href=\"#\" class=\"site_title\"><i class=\"fa fa-ellipsis-h\"></i> <span>${appName}</span></a>\r\n            </div>\r\n            <div class=\"clearfix\"></div>\r\n    <compose view=\"./sidebar-profile.html\"></compose>\r\n    <compose view=\"./sidebar-menu.html\"></compose>\r\n    <compose view=\"./sidebar-footer.html\"></compose>\r\n      </div>\r\n    </div>\r\n</template>"; });
define('text!components/rightView.html', ['module'], function(module) { module.exports = "<template>\r\n    <compose view=\"./chat-main.html\"></compose>\r\n</template>"; });
define('text!components/sidebar-footer.html', ['module'], function(module) { module.exports = "<template> \r\n  <require from=\"./bootstrap-tooltip\"></require>\r\n    <!-- /menu footer buttons -->\r\n    <div class=\"sidebar-footer hidden-small\">\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Profile\" click.trigger=\"displayProfile()\">\r\n           <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Settings\">\r\n          <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Appear Offline\" click.trigger=\"appearOffline()\">\r\n          <span class=\"glyphicon glyphicon-eye-close\" aria-hidden=\"true\"></span>\r\n        </a>\r\n        <a bootstrap-tooltip data-toggle=\"tooltip\" data-placement=\"top\" title=\"Logout\" click.trigger=\"logout()\">\r\n           <span class=\"glyphicon glyphicon-off\" aria-hidden=\"true\"></span>\r\n        </a>\r\n    </div>\r\n</template> \r\n"; });
define('text!components/sidebar-menu.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"./navbar\"></require>\r\n    <require from=\"./contact-list\"></require>\r\n    <require from=\"./channel-list\"></require>\r\n\r\n    <div id=\"sidebar-menu\" class=\"main_menu_side hidden-print main_menu\">\r\n        <div class=\"menu_section active\">\r\n            <h3 style=\"\r\n            padding-top: 100px;\r\n            font-size: 15px;\r\n        \">General</h3>\r\n            <ul class=\"nav side-menu\">\r\n                <channel-list><!-- Channels menu --></channel-list>\r\n                <contact-list><!-- Messages menu --></contact-list>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!components/sidebar-profile.html', ['module'], function(module) { module.exports = "<template> \r\n    <div class=\"clearfix\"></div>\r\n    <!-- menu profile quick info -->\r\n    <div class=\"profile\">\r\n        <div class=\"profile_pic\">\r\n           <img src=\"images/${account.icon}\" alt=\"...\" class=\"img-circle profile_img\">\r\n        </div>\r\n        <div class=\"profile_info\">\r\n          <span>Welcome,</span>\r\n          <h2>${fullName()}</h2>\r\n        </div>\r\n    </div>\r\n</template> \r\n"; });
define('text!components/top-nav.html', ['module'], function(module) { module.exports = "<template> \r\n    <div class=\"top_nav\">\r\n        <div class=\"nav_menu\">\r\n        <nav>\r\n            <div class=\"nav toggle\">\r\n            <a click.delegate=\"toggleNavigation()\"><i class=\"fa fa-bars\"></i></a>\r\n            </div>\r\n\r\n            <ul class=\"nav navbar-nav navbar-right\">\r\n            <li class=\"\" style=\"width: 220px;\">\r\n                <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                <img src=\"images/${account.icon}\" alt=\"\">${fullName()}\r\n                <i class=\" fa fa-angle-down\"></i>\r\n                </a>\r\n                <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                <li><a href=\"javascript:;\"> Profile</a></li>\r\n                <li>\r\n                    <a href=\"javascript:;\">\r\n                    <span class=\"badge bg-red pull-right\">50%</span>\r\n                    <span>Settings</span>\r\n                    </a>\r\n                </li>\r\n                <li><a href=\"javascript:;\">Help</a></li>\r\n                <li><a href=\"login.html\"><i class=\"fa fa-sign-out pull-right\"></i> Log Out</a></li>\r\n                </ul>\r\n            </li>\r\n\r\n            <li role=\"presentation\" class=\"dropdown\">\r\n                <a href=\"javascript:;\" class=\"dropdown-toggle info-number\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                <i class=\"fa fa-envelope-o\"></i>\r\n                <span class=\"badge bg-green\">6</span>\r\n                </a>\r\n                <ul id=\"menu1\" class=\"dropdown-menu list-unstyled msg_list\" role=\"menu\">\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a>\r\n                    <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\"></span>\r\n                    <span>\r\n                        <span>John Smith</span>\r\n                        <span class=\"time\">3 mins ago</span>\r\n                    </span>\r\n                    <span class=\"message\">\r\n                        Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <div class=\"text-center\">\r\n                    <a>\r\n                        <strong>See All Alerts</strong>\r\n                        <i class=\"fa fa-angle-right\"></i>\r\n                    </a>\r\n                    </div>\r\n                </li>\r\n                </ul>\r\n            </li>\r\n            </ul>\r\n        </nav>\r\n        </div>\r\n    </div>\r\n</template>"; });
define('text!users/login.html', ['module'], function(module) { module.exports = "<template>\r\n<h1>Login</h1>\r\n</template>"; });
define('text!views/layout-app.html', ['module'], function(module) { module.exports = "<template>\r\n    <!-- leftView -->\r\n    <slot name=\"leftView\"></slot>\r\n    <!-- leftView -->\r\n    <slot name=\"topNav\"></slot>\r\n    <!-- rightView -->\r\n    <slot name=\"rightView\"></slot>\r\n    <!-- rightView -->\r\n</template>"; });
define('text!components/chat-tile.html', ['module'], function(module) { module.exports = "<template>\r\n    <div repeat.for=\"chat of activeChats\" class=\"col-lg-4 col-md-6 col-sm-12\">\r\n        <div class=\"x_panel\">\r\n            <div class=\"x_title\">\r\n                <div class=\"col-md-12 pad-left\">\r\n                    <h2><i class=\"fa\" class.bind=\"chat.type == 'channel' ? 'fa-hashtag' : chat.type == 'message' ? 'fa-user' : 'fa-question'\"></i> ${chat.title}\r\n                    <small>${chat.type}</small></h2>\r\n                    <ul class=\"nav navbar-right panel_toolbox\">\r\n                    <li class=\"dropdown\">\r\n                        <a aria-expanded=\"false\" class=\"dropdown-toggle\"\r\n                        data-toggle=\"dropdown\" href=\"#\" role=\r\n                        \"button\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                        <ul class=\"dropdown-menu\" role=\"menu\">\r\n                            <li>\r\n                                <a href=\"#\"><i class=\"fa fa-youtube\"></i>\r\n                                Link a video</a>\r\n                            </li>\r\n                            <li>\r\n                                <a href=\"#\"><i class=\"fa fa-paperclip\"></i>\r\n                                Attach a file 2</a>\r\n                            </li>\r\n                        </ul>\r\n                    </li>\r\n                    <li>\r\n                        <a class=\"close-link\"><i class=\r\n                        \"fa fa-close\"></i></a>\r\n                    </li>\r\n                </ul>\r\n                </div>\r\n\r\n                <div class=\"clearfix\"></div>\r\n            </div>\r\n            <div class=\"x_content\">\r\n                <div class=\"dashboard-widget-content\">\r\n                    <div class=\"col-md-12\">\r\n                        <ul class=\"list-unstyled msg_list\">\r\n                            <li repeat.for=\"message of chat.messages\">\r\n                                <a>\r\n                                    <span class=\"image\">\r\n                                        <img alt=\"img\" src=\"images/${userDetails(message.from).icon}\">\r\n                                    </span>\r\n                                    <span>\r\n                                        <span>${userDetails(message.from).firstName}</span>\r\n                                        <span class=\"time\">3 mins ago</span>\r\n                                    </span>\r\n                                    <span class=\"message\">\r\n                                        ${message.data}\r\n                                        <div if.bind=\"message.attachments\" id=\"attachments\">\r\n                                            <div repeat.for=\"attachment of message.attachments\" id=\"attachment\">\r\n                                                <div id=\"youtube\" if.bind=\"attachment.type == 'video'\">\r\n                                                    <iframe src=\"http://www.youtube.com/embed/${attachment.id}\" width=\"427\" height=\"240\" frameborder=\"0\" allowfullscreen=\"\"></iframe>\r\n                                                </div>\r\n                                                <span class=\"image\" if.bind=\"attachment.type == 'image'\">\r\n                                                    <img alt=\"img\" src=\"images/${attachment.id}\">\r\n                                                </span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </span>\r\n                                </a>\r\n                            </li>\r\n                            <!--<li class=\"message_dark\">\r\n                                <a> <span><span>John\r\n                                Doe</span> <span class=\"time\">3 mins\r\n                                ago</span></span> <span class=\r\n                                \"message\">What do you need?</span></a>\r\n                            </li>\r\n                            <li>\r\n                                <a><span class=\"image\"><img alt=\"img\" src=\r\n                                \"images/face7.ico\"></span>\r\n                                <span><span>Michael Long</span>\r\n                                <span class=\"time\">3 mins ago</span></span>\r\n                                <span class=\"message\">Im stuck on this\r\n                                issue, and cannot debug it.. Can you help?\r\n                                <img src=\"images/error.png\"></span></a>\r\n                            </li>\r\n                            <li class=\"message_dark\">\r\n                                <a><span class=\"image\"><img alt=\"img\" src=\r\n                                \"images/face2.ico\"></span> <span><span>John\r\n                                Doe</span> <span class=\"time\">3 mins\r\n                                ago</span></span> <span class=\r\n                                \"message\">That means that you are breaking\r\n                                the syntax rules, you need to check the\r\n                                documentation and follow their\r\n                                parameters.</span></a>\r\n                            </li>-->\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-lg-9 col-md-12\">\r\n                            <input class=\"form-control tall-input\"\r\n                            placeholder=\"Message...\" type=\"text\">\r\n                        </div>\r\n                        <div class=\"col-lg-3 col-md-12\">\r\n                            <label class=\"full control-label\" style=\"float:right\"><a class=\r\n                            \"btn btn-app\" click.trigger=\"displayChats()\"><i class=\"fa fa-envelope-o\"></i>\r\n                            send</a></label>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map