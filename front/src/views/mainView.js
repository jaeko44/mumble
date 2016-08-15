import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as toastr from "toastr";

@inject(Profile, EventAggregator)
export class mainView {

  constructor(profile, ea){
    this.ea = ea;
    ea.subscribe('saveTheme', theme => this.updateTheme(theme));
    ea.subscribe('updateTheme', theme => this.updateTheme(theme));
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
    this.theme = this.settings.theme;
  }
  updateTheme(theme) {
    this.theme = theme;
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