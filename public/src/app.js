import {Router} from 'aurelia-router';
import {$} from 'jquery';
import {inject} from 'aurelia-framework';
import {WebAPI} from './data/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import toastr from 'toastr';
import 'firebase';
import 'sweetalert';
import io from 'socket.io-client';
import feathers from 'feathers-client';
var socket = io('http://localhost:3030', { transports: ['websocket'], forceNew: true });
var featherApp = feathers();

@inject(Router, EventAggregator, WebAPI, io)
export class App {
  constructor(router, ea, api, io) {
    this.api = api;
    this.ea = ea;
    ea.subscribe('loggedSuccesfully', accountEmail => this.loggedSuccesfully(accountEmail));
    this.router = router;
    this.router.configure(this.configureRoutes);
    this.loggedIn = false;
  }

  loggedSuccesfully(accountEmail) {
    this.loggedIn = true;
    toastr.options.progressBar = true;
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'slideUp';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.showMethod = 'slideDown';
    toastr.success('Welcome ' + accountEmail, 'You are now connected to :' + this.appNametxt);
  }
  activate() {
    featherApp.configure(feathers.socketio(socket));
    var messages = featherApp.service('messages');
    messages.on('created', message => {
      console.log('Your message was detected Aurelia APPJS: ', message);
    });
    this.api.isLoggedIn().then(value => {
      this.loggedIn = true;
    }).catch(value => {
      this.loggedIn = false;
    });
  }
  configureRoutes(cfg, navigationInstruction) {
    function step() {
      return step.run;
    }
    step.run = (navigationInstruction, next) => {
      return next();
    };
    cfg.addPipelineStep('authorize', AuthorizeStep);
    cfg.title = '... mumble';
    cfg.map([
      { route: '', name: 'login', moduleId: 'views/loginView', title: 'Account Mumble', settings: {page: 'login'} },
      { route: 'home', name: 'home', moduleId: 'views/mainView', title: 'home' },
      { route: 'contacts/:id',  moduleId: 'contact-detail', name: 'contacts' },
      { route: 'settings/:page', name: 'settings', moduleId: 'views/mainView', title: 'Settings :page' },
      { route: 'account/:page', name: 'account',  moduleId: 'views/loginView', title: 'Account Mumble' }
    ]);
  }
}

class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      var isLoggedIn = App.loggedIn;
      console.log('isLoggedIn VARIABLE :', isLoggedIn);
      if (!isLoggedIn) {
        return next.cancel(new Router('login'));
      }
    }
    return next();
  }
}