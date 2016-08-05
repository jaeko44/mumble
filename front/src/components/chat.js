import {Profile} from '../app/profile';
import {inject} from 'aurelia-framework';
import $ from 'jquery';
import 'bootstrap';

@inject(Profile)
export class Chat {

  constructor(profile) {
    this.profile = profile;
    this.account = profile.getProfile();
    this.appName = 'mumble';
    this.navigation = 1;
  }

  fullName() {
    console.log('printing account1');
    console.log(this.account);
    return `${this.account.firstName} ${this.account.lastName}`;
  }

  toggleNavigation() {
    if (this.navigation == 2) {
      this.navigation = 1;
    }
    else {
      this.navigation = 2;
    }
  }
}
