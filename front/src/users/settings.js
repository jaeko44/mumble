import {Profile} from '../app/profile';
import {Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';
import 'bootstrap';

@inject(Profile, EventAggregator)
export class Chat {

  constructor(profile, ea) {
    this.ea = ea;
    this.profile = profile;
    this.account = profile.getProfile();
    this.settings = profile.getSettings();
    this.appName = this.settings.appName;
    this.navigation = this.settings.navigation;
    this.page = '';
  }
  
  activate(params) {
      this.page = params.page;
      console.log(params);
  }

  fullName() {
    console.log(this.account);
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
