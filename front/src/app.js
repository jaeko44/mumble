import {Router} from 'aurelia-router';
import {$} from 'jquery';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import toastr from 'toastr';

@inject(Router, EventAggregator)
export class App {
  constructor(router, ea) {
    this.ea = ea;
    ea.subscribe('loggedSuccesfully', account => this.loggedSuccesfully(account));
    this.router = router;
    this.router.configure(this.configureRoutes);
    this.loggedIn = false;
  }

  loggedSuccesfully(account) {
    this.loggedIn = true;
    toastr.options.progressBar = true;
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'slideUp';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.showMethod = 'slideDown';
    toastr.success('Welcome ' + account.firstName, 'You are now connected.');
  }

  configureRoutes(cfg, navigationInstruction) {
    function step() {
      return step.run;
    }
    step.run = (navigationInstruction, next) => {
      return next()
    };
    cfg.addAuthorizeStep(step);
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
      console.log('isLoggedIn var :', isLoggedIn)
      if (!isLoggedIn) {
        return next.cancel(location.assign('#/home'));
      }
    }
    return next();
  }
}