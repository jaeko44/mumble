import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }

  constructor(router) {
    this.router = router;
    this.router.configure(this.configureRoutes);
  }
  configureRoutes(cfg) {
    cfg.title = '... mumble';
    cfg.map([
      { route: ['', 'home'], moduleId: 'components/chat' },
      { route: 'login', name: 'login',  moduleId: 'users/login'}
    ]);
  }
}
