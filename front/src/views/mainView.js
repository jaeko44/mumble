import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';

@inject(Profile)
export class mainView {

  constructor(profile){
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
  }
  activate(params, navigationInstruction) {
      this.route = navigationInstruction;
      console.log('printing params of homeView followed by navigationInstruction');
      console.log(navigationInstruction);
      console.log(params);
      if (this.route.name == 'home') {
          this.page = 'home';
      }
      else if (this.route.name == 'settings') {
          this.page = params.page;
      }
  }
  created() {
    this.navigation = this.settings.navigation;
  }
  fullName() {
    return `${this.account.firstName} ${this.account.lastName}`;
  }
  toggleNavigation() {
    if (this.navigation == 2) {
      this.navigation = 1;
      this.profile.setNavigationTo(1);
    }
    else {
      this.navigation = 2;
      this.profile.setNavigationTo(2);
    }
  }
}