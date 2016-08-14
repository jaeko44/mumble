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
  }

  loggedSuccesfully(account) {
    toastr.options.progressBar = true;
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'slideUp';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.showMethod = 'slideDown';
    toastr.success('Welcome ' + account.firstName, 'You are now connected.');
  }

  configureRoutes(cfg) {
    cfg.title = '... mumble';
    cfg.map([
      { route: ['', 'home'], name: 'home', moduleId: 'views/mainView', title: 'home' },
      { route: 'contacts/:id',  moduleId: 'contact-detail', name: 'contacts' },
      { route: 'settings/:page', name: 'settings', moduleId: 'views/mainView', title: 'Settings :page' },
      { route: 'account/:page', name: 'account',  moduleId: 'views/loginView', title: 'Account Mumble' }
    ]);
  }
}
