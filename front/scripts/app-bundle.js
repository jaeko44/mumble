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
      cfg.map([{ route: ['', 'home'], moduleId: 'app/chat' }, { route: 'login', name: 'login', moduleId: 'users/login' }]);
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
define('app/chat',['exports', './profile'], function (exports, _profile) {
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n  <h1>${heading}</h1>\n</template>\n"; });
define('text!chat.html', ['module'], function(module) { module.exports = "<template>\r\n  <router-view></router-view>\r\n\r\n<form submit.trigger=\"addUser()\">\r\n  <input type=\"text\" value.bind=\"setfName\">\r\n  <button type=\"submit\">Add User</button>\r\n</form>\r\n\r\n  <ul>\r\n    <li>\r\n      <span>\r\n        ${user.fName}\r\n      </span>\r\n      <span>\r\n        ${user.lName}\r\n      </span>\r\n      <span>\r\n        ${user.email}\r\n      </span>\r\n    </li>    \r\n  </ul>\r\n\r\n  <form submit.trigger=\"updateEmail()\">\r\n  <input type=\"text\" value.bind=\"setEmail\">\r\n  <button type=\"submit\">Update Email</button>\r\n</form>\r\n</template>\r\n"; });
define('text!user/login.html', ['module'], function(module) { module.exports = ""; });
define('text!app/chat.html', ['module'], function(module) { module.exports = "<template>\r\n  <router-view></router-view>\r\n\r\n<form submit.trigger=\"addUser()\">\r\n  <input type=\"text\" value.bind=\"setfName\">\r\n  <button type=\"submit\">Add User 2</button>\r\n</form>\r\n\r\n  <ul>\r\n    <li>\r\n      <span>\r\n        ${user.fName}\r\n      </span>\r\n      <span>\r\n        ${user.lName}\r\n      </span>\r\n      <span>\r\n        ${user.email}\r\n      </span>\r\n    </li>    \r\n  </ul>\r\n\r\n  <form submit.trigger=\"updateEmail()\">\r\n  <input type=\"text\" value.bind=\"setEmail\">\r\n  <button type=\"submit\">Update Email</button>\r\n</form>\r\n</template>\r\n"; });
define('text!users/login.html', ['module'], function(module) { module.exports = ""; });
define('text!views/layout.html', ['module'], function(module) { module.exports = ""; });
define('text!views/layout-app.html', ['module'], function(module) { module.exports = "<template>\r\n  <body class=\"nav-md\">\r\n    <div class=\"container body\">\r\n      <div class=\"main_container\">\r\n        <div class=\"col-md-3 left_col\">\r\n          <div class=\"left_col scroll-view\">\r\n            <div class=\"navbar nav_title\" style=\"border: 0;\">\r\n              <a href=\"index.html\" class=\"site_title\"><span><i class=\"fa fa-ellipsis-h\"></i> mumble</span></a>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n\r\n            <!-- menu profile quick info -->\r\n            <div class=\"profile\">\r\n              <div class=\"profile_pic\">\r\n                <img src=\"images/face2.ico\" alt=\"...\" class=\"img-circle profile_img\">\r\n              </div>\r\n              <div class=\"profile_info\">\r\n                <span>Welcome,</span>\r\n                <h2>John Doe</h2>\r\n              </div>\r\n            </div>\r\n            <!-- /menu profile quick info -->\r\n\r\n            <br />\r\n\r\n            <!-- sidebar menu -->\r\n            <div id=\"sidebar-menu\" class=\"main_menu_side hidden-print main_menu\">\r\n              <div class=\"menu_section\">\r\n                <h3 style=\"\r\n                  padding-top: 75px;\r\n                  font-size: 15px;\r\n              \">General</h3>\r\n                <ul class=\"nav side-menu\">\r\n                <li><a><i class=\"fa fa-hashtag\"></i> Channels <span class=\"fa fa-chevron-down\"></span></a>\r\n                    <ul class=\"nav child_menu\">\r\n                      <li><a href=\"index.html\">New Channel <span class=\"fa fa-plus\"></a></li>\r\n                      <li><a href=\"index2.html\"># General</a></li>\r\n                      <li><a href=\"index3.html\"># Development</a></li>\r\n                    </ul>\r\n                </li>\r\n                  <li><a><i class=\"fa fa-envelope\"></i> Messages <span class=\"fa fa-chevron-down\"></span></a>\r\n                    <ul class=\"nav child_menu\">\r\n                      <li><a href=\"index.html\">New Message <span class=\"fa fa-plus\"></a></li>\r\n                      <li><a href=\"index2.html\">Michael Long</a></li>\r\n                      <li><a href=\"index3.html\">Daniel Ting</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <!-- /sidebar menu -->\r\n\r\n            <!-- /menu footer buttons -->\r\n            <div class=\"sidebar-footer hidden-small\">\r\n              <a data-toggle=\"tooltip\" data-placement=\"top\" title=\"Profile\">\r\n                <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>\r\n              </a>\r\n              <a data-toggle=\"tooltip\" data-placement=\"top\" title=\"Settings\">\r\n                <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\r\n              </a>\r\n              <a data-toggle=\"tooltip\" data-placement=\"top\" title=\"Lock\">\r\n                <span class=\"glyphicon glyphicon-eye-close\" aria-hidden=\"true\"></span>\r\n              </a>\r\n              <a data-toggle=\"tooltip\" data-placement=\"top\" title=\"Logout\">\r\n                <span class=\"glyphicon glyphicon-off\" aria-hidden=\"true\"></span>\r\n              </a>\r\n            </div>\r\n            <!-- /menu footer buttons -->\r\n          </div>\r\n        </div>\r\n\r\n        <!-- top navigation -->\r\n        <div class=\"top_nav\">\r\n          <div class=\"nav_menu\">\r\n            <nav>\r\n              <div class=\"nav toggle\">\r\n                <a id=\"menu_toggle\"><i class=\"fa fa-bars\"></i></a>\r\n              </div>\r\n\r\n              <ul class=\"nav navbar-nav navbar-right\">\r\n                <li class=\"\">\r\n                  <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                    <img src=\"images/face2.ico\" alt=\"\">John Doe\r\n                    <span class=\" fa fa-angle-down\"></span>\r\n                  </a>\r\n                  <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                    <li><a href=\"javascript:;\"> Profile</a></li>\r\n                    <li>\r\n                      <a href=\"javascript:;\">\r\n                        <span class=\"badge bg-red pull-right\">50%</span>\r\n                        <span>Settings</span>\r\n                      </a>\r\n                    </li>\r\n                    <li><a href=\"javascript:;\">Help</a></li>\r\n                    <li><a href=\"login.html\"><i class=\"fa fa-sign-out pull-right\"></i> Log Out</a></li>\r\n                  </ul>\r\n                </li>\r\n\r\n                <li role=\"presentation\" class=\"dropdown\">\r\n                  <a href=\"javascript:;\" class=\"dropdown-toggle info-number\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                    <i class=\"fa fa-envelope-o\"></i>\r\n                    <span class=\"badge bg-green\">6</span>\r\n                  </a>\r\n                  <ul id=\"menu1\" class=\"dropdown-menu list-unstyled msg_list\" role=\"menu\">\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\" /></span>\r\n                        <span>\r\n                          <span>John Smith</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\" /></span>\r\n                        <span>\r\n                          <span>John Smith</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\" /></span>\r\n                        <span>\r\n                          <span>John Smith</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\"><img src=\"images/img.jpg\" alt=\"Profile Image\" /></span>\r\n                        <span>\r\n                          <span>John Smith</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Film festivals used to be do-or-die moments for movie makers. They were where...\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <div class=\"text-center\">\r\n                        <a>\r\n                          <strong>See All Alerts</strong>\r\n                          <i class=\"fa fa-angle-right\"></i>\r\n                        </a>\r\n                      </div>\r\n                    </li>\r\n                  </ul>\r\n                </li>\r\n              </ul>\r\n            </nav>\r\n          </div>\r\n        </div>\r\n        <!-- /top navigation -->\r\n\r\n        <!-- page content -->\r\n        <div class=\"right_col\" role=\"main\">\r\n\r\n          <div class=\"row\">\r\n            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n              <div class=\"x_panel\">\r\n                <div class=\"x_title\">\r\n                  <h2><i class=\"fa fa-user\"></i> Michael Long <small>messages</small></h2>\r\n                  <ul class=\"nav navbar-right panel_toolbox\">\r\n                    </li>\r\n                    <li class=\"dropdown\">\r\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                      <ul class=\"dropdown-menu\" role=\"menu\">\r\n                        <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                        </li>\r\n                        <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                        </li>\r\n                      </ul>\r\n                    </li>\r\n                    <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                    </li>\r\n                  </ul>\r\n                  <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"x_content\">\r\n                  <div class=\"dashboard-widget-content\">\r\n                  <div class=\"col-md-12\">\r\n                    <ul class=\"list-unstyled msg_list\">\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face7.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Michael Long</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Hey bro, I really need your help on some stuff..\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li class=\"message_dark\">\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face2.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>John Doe</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          What do you need?\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face7.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Michael Long</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Im stuck on this issue, and cannot debug it.. Can you help?\r\n                          <img src=\"images/error.png\">\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li class=\"message_dark\">\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face2.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>John Doe</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          That means that you are breaking the syntax rules, you need to check the documentation and follow their parameters.\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                  </ul>\r\n                  </div>\r\n                  <div class=\"form-group\">\r\n                    <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                      <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                      <label class=\"control-label\">\r\n                        <a class=\"btn btn-app\">\r\n                        <i class=\"fa fa-envelope-o\"></i> send\r\n                      </a>\r\n                      </label>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n              <div class=\"x_panel\">\r\n                <div class=\"x_title\">\r\n                  <h2><i class=\"fa fa-hashtag\"></i> Development <small>channels</small></h2>\r\n                  <ul class=\"nav navbar-right panel_toolbox\">\r\n                    <li class=\"dropdown\">\r\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                      <ul class=\"dropdown-menu\" role=\"menu\">\r\n                        <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                        </li>\r\n                        <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                        </li>\r\n                      </ul>\r\n                    </li>\r\n                    <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                    </li>\r\n                  </ul>\r\n                  <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"x_content\">\r\n                  <div class=\"dashboard-widget-content\">\r\n                  <div class=\"col-md-12\">\r\n                    <ul class=\"list-unstyled msg_list\">\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Borat</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Hey guys, how's the app developing so far?'\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li class=\"message_dark\">\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face2.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>John Doe</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Buggy buggy, we need more resources or time to get this done.\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face4.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Daniel Ting</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Yea, this is no where close to release.\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Borat</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Okay, time is running out - please focus more resources on this app to meet deadline.\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                  </ul>\r\n                  </div>\r\n                  <div class=\"form-group\">\r\n                    <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                      <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                      <label class=\"control-label\">\r\n                        <a class=\"btn btn-app\">\r\n                        <i class=\"fa fa-envelope-o\"></i> send\r\n                      </a>\r\n                      </label>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-4 col-sm-4 col-xs-12\">\r\n              <div class=\"x_panel\">\r\n                <div class=\"x_title\">\r\n                  <h2><i class=\"fa fa-user\"></i> General <small>channels</small></h2>\r\n                  <ul class=\"nav navbar-right panel_toolbox\">\r\n                    <li class=\"dropdown\">\r\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-chevron-down\"></i></a>\r\n                      <ul class=\"dropdown-menu\" role=\"menu\">\r\n                        <li><a href=\"#\"><i class=\"fa fa-youtube\"></i> Link a video</a>\r\n                        </li>\r\n                        <li><a href=\"#\"><i class=\"fa fa-paperclip\"></i> Attach a file 2</a>\r\n                        </li>\r\n                      </ul>\r\n                    </li>\r\n                    <li><a class=\"close-link\"><i class=\"fa fa-close\"></i></a>\r\n                    </li>\r\n                  </ul>\r\n                  <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"x_content\">\r\n                  <div class=\"dashboard-widget-content\">\r\n                  <div class=\"col-md-12\">\r\n                    <ul class=\"list-unstyled msg_list\">\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face6.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Samuel Goulding</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Can someone link me with a good Ember tutorial?\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li class=\"message_dark\">\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face2.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>John Doe</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                            <iframe src=\"http://www.youtube.com/embed/T1SC44NJA_A\"\r\n                             width=\"427\" height=\"240\" frameborder=\"0\" allowfullscreen></iframe>\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face3.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Daniel Ting</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Very informative.\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                    <li>\r\n                      <a>\r\n                        <span class=\"image\">\r\n                          <img src=\"images/face.ico\" alt=\"img\">\r\n                        </span>\r\n                        <span>\r\n                          <span>Borat</span>\r\n                          <span class=\"time\">3 mins ago</span>\r\n                        </span>\r\n                        <span class=\"message\">\r\n                          Who can link me with a borat movie!\r\n                        </span>\r\n                      </a>\r\n                    </li>\r\n                  </ul>\r\n                  </div>\r\n                  <div class=\"form-group\">\r\n                    <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                      <input type=\"text\" class=\"form-control tall-input\" placeholder=\"Message...\">\r\n                    </div>\r\n                    <div class=\"col-md-3\">\r\n                      <label class=\"control-label\">\r\n                        <a class=\"btn btn-app\">\r\n                        <i class=\"fa fa-envelope-o\"></i> send\r\n                      </a>\r\n                      </label>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <!-- /page content -->\r\n\r\n      </div>\r\n    </div>\r\n\r\n    <!-- jQuery -->\r\n    <script src=\"../vendors/jquery/dist/jquery.min.js\"></script>\r\n    <!-- Bootstrap -->\r\n    <script src=\"../vendors/bootstrap/dist/js/bootstrap.min.js\"></script>\r\n    <!-- FastClick -->\r\n    <script src=\"../vendors/fastclick/lib/fastclick.js\"></script>\r\n    <!-- Custom Theme Scripts -->\r\n    <script src=\"../build/js/custom.min.js\"></script>\r\n  </body>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map