import {Router} from 'aurelia-router';

export class App {
  static inject() { return [Router]; }

  constructor(router) {
    this.router = router;
    this.router.configure(this.configureRoutes);
  }
  configureRoutes(cfg) {
    cfg.title = 'Mumble ';
    cfg.map([
      { route: ['', ':filter'], moduleId: 'chat' }
    ]);
  }
}
