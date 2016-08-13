import {Router} from 'aurelia-router';
import {$} from 'jquery';

export class App {
  static inject() { return [Router]; }

  constructor(router) {
    this.router = router;
    this.router.configure(this.configureRoutes);
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
